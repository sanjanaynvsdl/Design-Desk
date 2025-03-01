import { Router, Request, Response } from "express";
import { Users } from "../Schema/db";
import { string, z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {userMiddleware} from "../middlewares/userMiddleware"


const userRouter = Router();
const userSchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .min(4, { message: "Please provide a valid name!" })
    .max(20, { message: "Please provide a valid name!" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email provided" }),

  phoneNo: z
    .string({ required_error: "Phone number is required" })
    .length(10, { message: "Please provide a valid phone no." }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contail atleast one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must have atlease one lowercase letter",
    }),
});

//for PUT req's
const updateUserSchema = userSchema.partial();
type updatedUserTypes = z.infer<typeof updateUserSchema>;
type userTypes = z.infer<typeof userSchema>;

//1. zod validation
//2. check if user already exists
//3. Hash Pass, store in DB
//4. Create token, set to cookies
//5. return
userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const result = userSchema.safeParse(req.body);
    // console.log(result);
    //result returns -> {success:true data}, else {success:false, error}

    //Error Obj //mapped the Arr[obj] to return with formatted error message 
    /*
        "error": {
        "issues": [
            {"message": "Please provide a valid name!"},
            {"message": "Please provide a valid phone no."},
    */
    if (!result.success) {
        const errors=result.error.issues.map((err)=>err.message).join(", ");
        res.status(400).json({
            message: errors,
        });
      return;
    }
    const { name, password, phoneNo, email }: userTypes = result.data;

    const findUser = await Users.findOne({ email: email });
    if (findUser) {
      res.status(400).json({ message: "User with this email already exists!" });
      return;
    }

    const hasedPass = await bcrypt.hash(password, 10);
    const newUser = new Users({
      name: name,
      email: email,
      phoneNo: phoneNo,
      password: hasedPass,
    });

    await newUser.save();

    //create a token, and set it in cookies
    const secret_key = process.env.JWT_SECRET_KEY;
    if (!secret_key) {
      res.status(500).json({
        message: "Please provide valid secret key",
      });
      return;
    }

    const token = jwt.sign({
        userId:newUser._id
    }, secret_key, { expiresIn: "6d" });

    res.cookie("admin_token", token, {
        httpOnly: false,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "lax", //will send cookies only in first-party context, not to other website requests!
        secure: false,  //todo: set to true in prod.
      })
      .status(200)
      .json({ message: "Successfully signed up!" });
    


  } catch (error: any) {
    console.log(`Internal server error in user signup functionality ${error}`);
    res.status(500).json({
        message:`Internal server error in user signup functionality`,
        error:error.message
    });
  }
});

//login
//1. Check if user Exists
//2. Verify Password
//3. Create token, set to cookies
userRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const result = updateUserSchema.safeParse(req.body); ///updatedUserschema is for optional parameters

    if(!result.success) {
        const errors = result.error.issues.map((err)=>err.message).join(", ");
        res.status(400).json({
            message:errors
        });
        return;
    }
    const {password, email}:updatedUserTypes = result.data;
    if(!password || !email) {
        res.status(400).json({
            message:"please provide valid input"
        });
        return;
    } 

    const findUser = await Users.findOne({
        email:email,
    });

    if(!findUser) {
        res.status(404).json({
            message:"User does not exist, Please sign up!"
        });
        return;
    }

    const decodePass = await bcrypt.compare(password, findUser.password);
    if(!decodePass) {
        res.status(400).json({
            message:"Invalid password!"
        });
        return;
    }
    const secret_key = process.env.JWT_SECRET_KEY;
    if(!secret_key) {
        res.status(500).json({
            message:"no valid jwt_secret_key"
        });
        return;
    }

    const token = jwt.sign({userId:findUser._id}, secret_key, {expiresIn:'6d'});

    res.cookie("admin_token",token, {
        httpOnly: false,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: 'lax', // Use 'lax' for development (sends cookie in only first-party req, not to other websites)
        secure: false //todo: Set to true in production with HTTPS
    });

    res.status(200).json({
        message:"Successfully signed in!"
    });

  } catch (error:any) {
    console.log(`Internal server error in user signin functionality ${error}`);
    res.status(500).json({
        message:`Internal server error in user signin functionality`,
        error:error.message
    });
  }
});


//get-User data
//1. Using middleware if user, is authenticated
//2. get user-id from middlwware
//3. Verify user from DB and return,
userRouter.get("/me", userMiddleware, async(req:Request,res:Response)=>{
    try {
        const userId = req.userId;
            const getUser = await Users.findById(userId).select("-password")

            if(getUser) {
                res.status(200).json({
                    user:getUser
                });
                return;
            } 

            res.status(404).json({
                message:`User with the given Id not found!`
            });
        
    } catch (error:any) {
        console.log(`Internal server error in get-user data functionality : ${error}`);
        res.status(500).json({
            message:`Internal server error in get-user data functionality`,
            error:error.message
        })
    }
});

//update-user data
//0. middleware,
//1. check if user-exist
//2. update the feilds
//3. return
userRouter.put("/profile",userMiddleware,  async (req: Request, res: Response) => {
    try {
        //zod validation
        const result = updateUserSchema.safeParse(req.body);

        if(!result.success) {
            const errors = result.error.issues.map((err)=>err.message).join(", ");
            res.status(400).json({
                message:errors
            });
            return;
        }

        const {name, email, phoneNo}:updatedUserTypes=result.data;
        const userId = req.userId;
        const updatedFeilds:updatedUserTypes = {}

        if(name) updatedFeilds.name=name;
        if(phoneNo) updatedFeilds.phoneNo=phoneNo;


        if(email) {
            const findUser = await Users.findOne({
                email:email,
               _id:{ $ne:userId }//not in userId
            });
            if(findUser) {
                res.status(400).json({
                    message:"User with this e-mail already exists!"
                });
                return;
            }
            updatedFeilds.email=email;
        }

        //new:true, returns the updated obj
        const updatedUser = await Users.findByIdAndUpdate(userId, updatedFeilds, {new:true}).select("-password")

        if(!updatedUser) {
            res.status(404).json({
                message:"User not found!"
            });
            return;
        } else {
            res.status(200).json({
                message:"Updated user successfully!",
                updatedUser:updatedUser
            });
            return;
        }
    
    } catch (error:any) {
        console.log(`Internal server error in update user functionality : ${error}`);
        res.status(500).json({
            message:`Internval server error in update user functionality`,
            error:error.message
        });
    }
});

export default userRouter;
