import { Router, Request, Response } from "express";
import { userMiddleware } from "../middlewares/userMiddleware";
import {z} from 'zod';
import { Customers, Orders } from "../Schema/db";
import mongoose from "mongoose";
import { createInvoice } from "../utils/createInvoice";
import {sendEmailWithInvoice} from "../utils/sendEmailOfInvoice"


const orderRouter = Router();

const orderSchema = z.object({
    name: z
    .string({required_error:"Customer Name is required"})
    .max(20, {message:"Customer name cannot exceed 20 characters"}),

    phoneNo: z
    .string({required_error:"Customer phone number is required!"})
    .length(10, {message:"Please provide a valid phone No"}),
    
    email:z
    .string({required_error:"Email of customer is required!"})
    .email({message:"Provide a valid email"}),
    

    place:z
    .string({required_error:"Customer place is required"})
    .max(30, {message:"Customer place cannot exceed 30 characters"}),

    ordersData:z.array( z
        .object({
            title:z.string({required_error:"Title for order is required!"}),
            quantity:z.coerce.number().int().positive(),
            unitPrice:z.coerce.number().positive(),
            totalPrice:z.coerce.number().positive(),
        })), 
        
    totalAmount:z.coerce.number().positive(),
    //coerce , if user-gives an "21" => converts to num => 21
    orderStatus:z.string({required_error:"Order status is required!"}).optional(),
    description:z.string({required_error:"Description for order is required"}),
    deliveryDate:z.coerce.date({required_error:"Delivery date is required!"}),
    paymentStatus:z.string({required_error:"Payment status is required!"}).optional(),
});

const partialOrderSchema = orderSchema.partial(); //for-update-inp validation
type orderTypes = z.infer<typeof orderSchema>
type partialOrderTypes = z.infer<typeof partialOrderSchema>

//Create-an-order
orderRouter.post("/", userMiddleware, async(req:Request,res:Response)=>{

    try {
        const result = orderSchema.safeParse(req.body);
        const adminId = req.userId;

        if(!result.success) {
            const errors = result.error.issues.map((err)=>err.message).join(", ");

            res.status(400).json({
                message:errors,
            });
            return;
        }
        // console.log(result.data);

        const {name, email, phoneNo, place}:orderTypes=result.data;
        const {ordersData,totalAmount, description,  deliveryDate}:orderTypes = result.data;

        const findExistingCustomer = await Customers.findOne({
            email:email,
        });

        //if-customer not found, create a new customer and save it, 
        let customerId;

        if(findExistingCustomer) {
            customerId=findExistingCustomer._id;
        } else {
            const newCustomer = await Customers.create({
                name:name,
                phoneNo:phoneNo,
                email:email,
                place:place,
                adminId:adminId,
            });
            customerId = newCustomer._id;
        }

        const newOrder = await Orders.create({
            customerId:customerId,
            ordersData:ordersData,
            totalAmount:totalAmount,
            orderStatus:"Pending",
            description:description,
            deliveryDate:deliveryDate,
            paymentStatus:"Pending",
            adminId:req.userId
        });

        const formatedDate = new Date(deliveryDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        // create-a invoice and send-mail
        const pdfBuffer = await createInvoice({ name, phoneNo, email, place, ordersData, totalAmount, formatedDate });

        try {
            if(pdfBuffer) {
                await sendEmailWithInvoice(pdfBuffer, email);
                res.status(200).json({
                    message: "Successfully created order and sent invoice via email.",
                    orderDetails: newOrder
                });
                return;
            }
        } catch (emailError: any) {
            console.error(`Error sending email: ${emailError.message}`);
            res.status(200).json({
                message: "Order created successfully, but failed to send invoice via email.",
                orderDetails: newOrder,
                emailError: emailError.message
            });
        }
        
    } catch (error:any) {
        console.log(`Internal server error in create-order functionality : ${error}`)
        res.status(500).json({
            message:`Internal server error in create-order route ${error}`,
            error:error.message
        })
    }
});

//update a order 
orderRouter.put("/:id", userMiddleware, async(req:Request,res:Response)=>{

    const orderId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        res.status(400).json({
            message:"Invalid orderId!"
        });
        return;
    }
    try {
        const result =  partialOrderSchema.safeParse(req.body);
        const adminId = req.userId;
        
        if(!result.success) {
            const errors = result.error.issues.map((err)=>err.message).join(", ");
            res.status(400).json({
                message:errors,
            });
            return;
        }

        //these feilds should be updated from customer Routes.
        //ordersData cannot be updated, 
        const {name, place, email, phoneNo}=result.data;

        const {ordersData, totalAmount, description, deliveryDate, paymentStatus, orderStatus}:partialOrderTypes = result.data;
        const findOrder = await Orders.findById(orderId);

        if(findOrder && (findOrder.adminId?.toString()!==adminId)) {
            res.status(403).json({
                message:"Not Authorized to update!"
            });
            return;
        }
        const updatedOrder = await Orders.findByIdAndUpdate(orderId, {
            totalAmount:totalAmount,
            description:description,
            deliveryDate:deliveryDate,
            paymentStatus:paymentStatus,
            orderStatus:orderStatus

        }, {new:true});

        if(updatedOrder) {
            res.status(200).json({
                message:"Successfully updated order!",
                order:updatedOrder
            }) 
            return;

        } else {
            res.status(404).json({
                message:"Order not found!"
            });
            return;
        }
    } catch (error:any) {
        console.log(`Error in update-order route : ${error}`);
        res.status(500).json({
            message:"Internal server error in update-order route",
            error:error.message
        });
    }
});

//delete a order
orderRouter.delete("/:id", userMiddleware, async(req:Request,res:Response)=>{
    const orderId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        res.status(400).json({
            message:"Invalid orderId"
        })
        return;
    }

    try {
        const adminId = req.userId;
        const currOder = await Orders.findById(orderId);
        if(currOder && (currOder.adminId?.toString()!==adminId)) {
            res.status(403).json({
                message:"Not Authorized to delete order!"
            });
            return;
        }       

        const deleteOrder = await Orders.findByIdAndDelete(orderId);
        if (!deleteOrder) {
          res.status(404).json({
            message: "Order not found!",
          });
          return;

        } else {
          res.status(200).json({
            message: "Order deleted successfully!",
          });
        }

    } catch (error:any) {
        console.log(`Error in delete-order route : ${error}`);
        res.status(500).json({
            message:"Internal server error in delete-order route",
            error:error.message,
        });
    }
});

//get- a particular order
orderRouter.get("/:id", userMiddleware, async(req:Request,res:Response)=>{
    const orderId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(orderId)) {
        res.status(400).json({
            message:"Invalid orderId"
        })
        return;
    }

    try {
        const currOrder = await Orders.findById(orderId).populate("customerId", "name email phoneNo place updatedAt");
        const adminId = req.userId;

        if(currOrder && currOrder.adminId?.toString()!==adminId) {
            res.status(403).json({
                message:"Not Authorized to get order data!"
            })
            return;
        }

        if(currOrder) {
            res.status(200).json({
                message:"Successfully retrived order data",
                order:currOrder
            });
            return;
        } else {
            res.status(404).json({
                message:"Order not found!"
            });
            return;
        }
        
    } catch (error:any) {
        console.log(`Error in get-order route : ${error}`);
        res.status(500).json({
            message:"Internal server error in get-order route",
            error:error.message
        });
    }
})

//get-all ordes
orderRouter.get("/", userMiddleware, async(req:Request,res:Response)=>{
    try {
        const adminId = req.userId;

        const orders = await Orders.find({
            adminId:adminId
        }).populate("customerId", "name email phoneNo place updatedAt");

        if(orders) {
            res.status(200).json({
                message:"Successfully retrived all orders!",
                orders:orders
            });
            return;
        } else {
            res.status(404).json({
                message:"Orders not found!"
            });
        }
    } catch (error:any) {
        console.log(`Error in get-all orders : ${error}`);
        res.status(500).json({
            message:"Internal server error in get-all orders route",
            error:error.message
        })
    }
});

//route to get the order history of a customer,
orderRouter.get("/customer/:id", userMiddleware, async(req:Request, res:Response)=> {
    const customerId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(customerId)) {
        res.status(400).json({
            message:"Invalid customerId!"
        });
        return;
    }

    try { 
        const customerOrders = await Orders.find({
            customerId:customerId,
        })
        // .populate("customerId", "name email phoneNo place") //not required, instead get-only once the customer data.

        const customerData = await Customers.findById(customerId);
        if(customerOrders && customerData) {
            res.status(200).json({
                message:"Successfully fetched customer orders!",
                customerDetails:customerData,
                orders:customerOrders,
            });
            return;
            
        } else {
            res.status(404).json({
                message:`Orders for the customer ${customerId} are not found!`
            })
        }
        
    } catch (error:any) {
        console.log(`Error in get-customer-orders route : ${error}`);
        res.status(500).json({
            message:"Internal server error in get-customer-order route",
            error:error.message
        });
    }
});

//search queries
orderRouter.get("/search?name=sanjana", async(req:Request,res:Response)=>{
});
export default orderRouter;

