import { Router, Request, Response } from "express";
import {z} from 'zod';
import { userMiddleware } from "../middlewares/userMiddleware";
import { Workers, WorkersLinks } from "../Schema/db";
import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';


const workerRouter = Router();

//zod inp validation,
const workersSchema = z.object({
    name:z
    .string({required_error:"Worker name is required!"})
    .max(20,{message:"Worker name cannot exceed 20 characters!"}),

    email:z
    .string({required_error:"Worker email is required!"})
    .email({message:"Please provide a valid mail of worker!"}),

    phoneNo:z
    .string({required_error:"Worker Phone number is required!"})
    .length(10, {message:"Please provide a valid phone No!"}),

    place:z
    .string({required_error:"Worker place is required"})
    .max(20, {message:"Worker place cannot exceed 20 characters!"}),

    description:z.string({required_error:"Worker description is required!"}),
    joinDate:z.coerce.date({required_error:"Worker join date is required!"}),

    workData:z.array(
        z.object({
            date:z.coerce.date({required_error:"Date for the specific work is required!"}),
            work:z.string({required_error:"Work description is required for specific date!"}),
            amount:z.coerce.number({required_error:"Amount for the work is required!"}).positive()

        })
    )
});

const dailyWorkSchema = z.object({
    date:z.coerce.date({required_error:"Date for the specific work is required!"}),
    work:z.string({required_error:"Work description is required for specific date!"}),
    amount:z.coerce.number({required_error:"Amount for the work is required!"}).positive()
})

//paritalTypes for PUT req's
const partialWorkersSchema = workersSchema.partial();
type workerTypes = z.infer<typeof workersSchema>
type workerPartialTypes = z.infer<typeof partialWorkersSchema>
type dailyWorkTypes = z.infer<typeof dailyWorkSchema>


//create a worker
workerRouter.post("/", userMiddleware, async(req:Request,res:Response)=> {
    try {
        const result = workersSchema.safeParse(req.body);
        const adminId = req.userId;

        if(!result.success) {
            const errors = result.error.issues.map((err)=>err.message).join(", ");
            res.status(400).json({
                message:errors
            });
            return;
        }

        const {name, email, place, phoneNo, description, joinDate, workData}:workerTypes = result.data;

        const newWorker = await Workers.create({
            name:name, 
            email:email,
            phoneNo:phoneNo,
            place:place,
            description:description,
            joinDate:joinDate,
            workData:workData,
            adminId:adminId,
        });

        // console.log(newWorker);
        if(newWorker) {
            res.status(200).json({
                message:"Successfully created new worker!",
                worker:newWorker,
            });
            return;
        }
        res.status(400).json({
            message:"Unbale to create new worker!"
        })
        
    } catch (error:any) {

        console.error(`Internal server error in create-worker route : ${error}`);
        if(error.code==11000) {
            res.status(409).json({
                message:"Worker with this mail already exists!",
            });
            return;
        }
        res.status(500).json({
            message:`Internal server error in create-worker route : ${error}`,
            error:error.message
        })
    }
});

//update workers dasta
workerRouter.put("/:id", userMiddleware, async(req:Request,res:Response)=>{
    const workerId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(workerId)) {
        res.status(400).json({
            message:"Invalid worker Id",
        });
        return;
    }

    try {
        const result = partialWorkersSchema.safeParse(req.body);
        const adminId = req.userId;

        if(!result.success) {
            const errors = result.error.issues.map((err)=>err.message).join(", ");
            res.status(400).json({
                message:errors,
            })
            return;
        }

        const {name, email, phoneNo, place, description, joinDate, workData}:workerPartialTypes = result.data;
        const updateFeilds:workerPartialTypes={};

        if(name) updateFeilds.name = name;
        if(phoneNo) updateFeilds.phoneNo=phoneNo;
        if(place) updateFeilds.place = place;
        if(description) updateFeilds.description=description;
        if(joinDate) updateFeilds.joinDate=joinDate;

        if(workData) {
            res.status(403).json({
                message:"Cannot update the workData"
            });
            return;
        }

        if(email) {
            const findExistingWoker = await Workers.findOne({
                email:email,
                _id:{$ne:workerId}
            });

            if(findExistingWoker) {
                res.status(400).json({
                    message:"Worker with this email already exists!"
                })
                return;
            }
            updateFeilds.email=email;
        }

        const worker = await Workers.findById(workerId);

        if(worker && worker.adminId?.toString()!==adminId) {
            res.status(403).json({
                message:"Not Auhtorized!",
            })
            return;

        }

        const updatedWorker = await Workers.findByIdAndUpdate(workerId, updateFeilds, {new:true});

        if(updatedWorker) {
            res.status(200).json({
                message:"Updated worker successfully!",
                worker:updatedWorker,
            });
            return;
        }

        res.status(404).json({
            message:"Worker not found!"
        });

    } catch (error:any) {
        console.log(`Internal server erorr in update-worker route : ${error}`);
        res.status(500).json({
            message:"Internal server error in update-worker route",
            error:error.message,
        })
    }
});

//delete worker
workerRouter.delete("/:id",userMiddleware,  async(req:Request,res:Response)=>{
    const workerId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(workerId)) {
        res.status(400).json({
            message:"Invalid worker Id!"
        });
        return;
    }

    try {
        const worker = await Workers.findById(workerId);
        const adminId = req.userId;

        if(worker && worker.adminId?.toString()!==adminId) {
            res.status(403).json({
                message:"Not Authorized!"
            });
            return;
        }

        const deleteWorker = await Workers.findByIdAndDelete(workerId);

        if(deleteWorker) {
            res.status(200).json({
                message:"Successfully deleted worker"
            })
            return;
        } 
        res.status(404).json({
            message:"Worker not found!"
        });

    } catch (error:any) {
        console.log(`Internal server error in delete worker route : ${error}`);
        res.status(500).json({
            message:"Internal server error in delete worker route",
            error:error.message,
        });
    }
});

//get- aspecific worker data
workerRouter.get("/:id", userMiddleware, async(req:Request,res:Response)=>{
    const workerId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(workerId)) {
        res.status(400).json({
            message:"Invalid workerId"
        });
        return;
    }
    
    try {
        const worker = await Workers.findById(workerId);
        const adminId = req.userId;

        if(worker && worker.adminId?.toString()!==adminId) {
            res.status(403).json({
                message:"Not Authorized",
            })
            return;
        }

        if(worker) {
            res.status(200).json({
                message:"Successfully retrived worker data",
                worker:worker,
            })
            return;
        }
        res.status(404).json({
            message:"Worker not found!"
        })
        
    } catch (error:any) {
        console.log(`Error in get-worker data route : ${error}`);
        res.status(500).json({
            message:"Internal server error in get-worker route!",
            error:error.message,
        })
    }

});

//get-all workers data
workerRouter.get("/", userMiddleware, async(req:Request,res:Response)=>{
    try {
        const adminId = req.userId;
        const workers  = await Workers.find({
            adminId:adminId
        });

        if(workers) {
            res.status(200).json({
                message:"Successfully retrived all workers",
                workers:workers,
            })
            return;
        }

        res.status(400).json({
            message:"Workers not found!",
        });

    } catch (error:any) {
        console.log(`Internal server error in get-all-worker route : ${error}`);
        res.status(500).json({
            message:"Internal server error in get-all workers route!",
            error:error.message,
        })
    }
});

workerRouter.put("/daily-work/:id", userMiddleware, async(req:Request,res:Response)=> {
    const workerId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(workerId)) {
        res.status(400).json({
            message:"Invalid workerId"
        })
        return;
    }
    try {
        const result = dailyWorkSchema.safeParse(req.body);
        if(!result.success) {
            const errors = result.error.issues.map((err)=>err.message).join(", ");
            res.status(400).json({
                message:errors
            })
            return;
        }

        // const {date, work, amount}:dailyWorkTypes =result.data;
        
        const updateWorker = await Workers.findByIdAndUpdate(workerId, {
           $push:{
            workData:result.data
           }
        }, {new:true});

        if(updateWorker) {
            res.status(200).json({
                message:"Updated work data successfully!"
            });
            return;
        } 

        res.status(404).json({
            message:"Worker not found!"
        })
        
    } catch (error:any) {
        console.log(`Error in updating worker-data route : ${error}`);
        res.status(500).json({
            message:"Internal server error in update worker-data",
            error:error.message,
        })
    }
})


workerRouter.post("/share",userMiddleware,  async( req:Request,res:Response)=> {
    try {
        const {workerId} = req.body;
        const adminId = req.userId;

        if(!mongoose.Types.ObjectId.isValid(workerId)) {
            res.status(400).json({
                message:"Invalid workerId"
            });
            return;
        }

        //check if-worker exists
        const findWorker = await Workers.findById(workerId);
        if(!findWorker) {
            res.status(404).json({
                message:"Worker not found!"
            });
            return;
        }

        //if worker is in, hash collection,
        const existingHash = await WorkersLinks.findOne({
            workerId:workerId
        });

        if(existingHash) {
            res.status(200).json({
                message:"Hash already exists!",
                hash:existingHash.hash,
            })
            return;
        }

        const hash = uuidv4(); //generates new-hash 128-bit
        await WorkersLinks.create({
            hash:hash,
            workerId:workerId,
            adminId:adminId,
        })

        res.status(200).json({
            message:"Successfully generated hash!",
            hash:hash,
        });
        
    } catch (error:any) {
        console.log(`Internal server error in create-hash : ${error}`);
        res.status(500).json({
            message:"Internal server error in creating-hash route",
            error:error.message
        });
    }
});

workerRouter.get("/share/:hash", async(req:Request, res:Response)=>{
    const hash = req.params.hash

    if(!hash) {
        res.status(400).json({
            message:"Invalid hash!"
        });
        return;
    }
    try {
        const workerData = await WorkersLinks.findOne({
            hash:hash,
        }).populate("workerId", "name phoneNo email place description workData");

    
        if(workerData) {
            res.status(200).json({
                message:"Successfully fetched workers-data from hash!",
                workerData:workerData,
            })
            return;
        }

        res.status(404).json({
            message:"Worker data not found!"
        });

    } catch (error:any) {
        console.log(`Internal server error in get worker-data using hash : ${error}`);
        res.status(500).json({
            message:"Internal server error in get-worker-data",
            error:error.message
        });
    }

});

export default workerRouter;