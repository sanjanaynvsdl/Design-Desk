import { Router, Request, Response } from "express";
import { custom, string, z } from "zod";
import { Customers } from "../Schema/db";
import { userMiddleware } from "../middlewares/userMiddleware";
import mongoose from "mongoose";


//400 - Client issue
//401 - Authentication required,
//403 - No Access
//404 - Not Found
//409 - Duplicate error
//500 - Internal server error
const customerRouter = Router();

//zod-schema for inp validation,
const customerSchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .min(4, { message: "Name must be atleast 4 character" })
    .max(30, { message: "Please provide a valid name" }),

  phoneNo: z
    .string({ required_error: "Phone number is required!" })
    .length(10, { message: "Please provide a valid phone number" }),

  email: z.string({ required_error: "Email is required!" }).email(),

  place: z
    .string({ required_error: "Place is required!" })
    .min(4, { message: "Place name should be minimum 4 characters" })
    .max(30, { message: "Please provide a valid place name" }),
});


const updateCustomerSchema = customerSchema.partial(); //used-for PUT req's
type updatedCustomerTypes = z.infer<typeof updateCustomerSchema>;
type customerTypes = z.infer<typeof customerSchema>;

//create-customer
customerRouter.post("/", userMiddleware, async (req: Request, res: Response) => {

    try {
      const result = customerSchema.safeParse(req.body);
      const adminId = req.userId;

      if (!result.success) {
        const errors = result.error.issues.map((err) => err.message).join(", ");
        res.status(400).json({
          message: errors,
        });
        return;
      }

      const { name, phoneNo, email, place }: customerTypes = result.data;

      const newCustomer = await Customers.create({
        name: name,
        phoneNo: phoneNo,
        email: email,
        place: place,
        adminId:adminId,
      });

      res.status(200).json({
        message: "Customer created successfully!",
        newCustomer: newCustomer,
      });

    } catch (error: any) {
      console.log(`Internal server error in create-customer functionality ${error}`);

      //handling duplicate-key error
      if (error.code == 11000) {
        res.status(409).json({
          message: "Customer with this email already exist",
        });
        return;
      }
      res.status(500).json({
        message: `Internal server error in create-customer route`,
        error: error.message,
      });
    }
  }
);

//update-customer
customerRouter.put("/:id", userMiddleware, async (req: Request, res: Response) => {

    try {
        const customerId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(customerId)) {
            res.status(400).json({
                message:"Please provide valid customer Id"
            });
            return;
        }

        //used-partial zod validation,
        const result = updateCustomerSchema.safeParse(req.body);
        const adminId= req.userId;
        
        if(!result.success) {
            const errors = result.error.issues.map((err)=>err.message).join(", "); //returns array of err obj, map message
            res.status(400).json({
                message:errors,
            });
            return;
        }
        const {name, phoneNo, email, place}=result.data;
        const updatedFeilds:updatedCustomerTypes={};

        if(name) updatedFeilds.name=name;
        if(phoneNo) updatedFeilds.phoneNo=phoneNo;
        if(place) updatedFeilds.place=place;

        if (email) {
          const existingEmail = await Customers.findOne({
            email: email,
            _id: { $ne: customerId },  //not in customerId, and finds if that filter is in other documents,
          });

          if (existingEmail) {
            res.status(409).json({
              message: "Customer with this email already exist!",
            });
            return;

          } else {
            updatedFeilds.email = email;
          }
        } 

        //before updating check the customer admin,
        const checkAdmin = await Customers.findById(customerId);
        if(checkAdmin && (checkAdmin.adminId)?.toString()!==adminId)  {
            res.status(403).json({
                message:"Not authorized to update!"
            });
            return;
        }

        //using-new it returns obj containing updated data
        const updateCustomer = await Customers.findByIdAndUpdate(customerId, updatedFeilds, {new:true});
        // console.log(updateCustomer);

        if(!updateCustomer) {
            res.status(404).json({
                message:"Customer not found!"
            });
            return;
        }

        res.status(200).json({
            message:"Updated customer data successfully!",
            updatedData:updateCustomer,
        });
 
    } catch (error: any) {
        console.log(`Internal server error in update-customer route ${error}`);
        res.status(500).json({
            message:'Internal server error in update-customer route',
            error:error.message
        });
    }
});

//Delete-Customer
customerRouter.delete("/:id", userMiddleware, async (req: Request, res: Response) => {
    const customerId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        res.status(400).json({
            message:"Please provide a valid customer Id"
        });
        return;
    }

    try {
        const adminId = req.userId;
        const checkAdmin = await Customers.findById(customerId);

        console.log(checkAdmin?.adminId?.toString());
        console.log(adminId);
        if(checkAdmin && (checkAdmin.adminId?.toString()!==adminId))  {
            res.status(403).json({
                message:"Not authorized to delete!"
            });
            return;
        }

        const deleteUser = await Customers.findByIdAndDelete(customerId);
        // console.log(deleteUser);

        if(!deleteUser) {
            res.status(404).json({
                message:"Customer not found!"
            });
            return;
        }
        res.status(200).json({
            message:"Deleted customer successfully!"
        })

    } catch (error: any) {
        console.log(`Internal server error in delete-customer route ${error}`);
        res.status(500).json({
            message:"Internal server error in delete-customer route",
            error:error.message
        });
    }
});


//get-specific customer, 
customerRouter.get("/:id",userMiddleware, async (req: Request, res: Response) => {

    const customerId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      res.status(400).json({
        message: "Please provide a valid customer Id",
      });
      return;
    }

    try {
        const adminId = req.userId;
        const customerData = await Customers.findById(customerId);

      if (customerData && customerData.adminId==adminId) {
        res.status(200).json({
          message: "Successfully Retrieved customer data",
          customerData: customerData,
        });
        return;

      } else {
        res.status(404).json({
          message: "Customer not found!",
        });
        return;
      }
      
    } catch (error: any) {
      console.log(`Internal server error in get-customer info route ${error}`);
      res.status(500).json({
        message: "Internal server error in get-customer info functionality",
        error: error.message,
      });
    }
  }
);

//get-all customers
customerRouter.get("/", userMiddleware, async (req: Request, res: Response) => {
    try {
        const adminId = req.userId;
        const customers = await Customers.find({adminId:adminId});
        
        if(customers) {
            res.status(200).json({
                message:"Successfully retrived all customers",
                customer:customers
            });
            return;
        } else {
            res.status(404).json({
                message:"Error while fetching customers data",
            });
            return;
        }
       
    } catch (error:any) {
        console.log(`Internal server error in get-all-customers route : ${error}`);
        res.status(500).json({
            message:"Internal server error in get-all-customers route",
            error:error.message
        });
    }
});


//search-for a customer //post backend.
customerRouter.get("/search?name=", async (req: Request, res: Response) => {

});

export default customerRouter;

