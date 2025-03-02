import express, { Express, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
dotenv.config();

import cookieParser from 'cookie-parser';
import userRoutes from "./Routes/userRoutes";
import customerRoutes from "./Routes/customerRoutes";
import orderRoutes from "./Routes/orderRoutes";
import workerRoues from "./Routes/workerRoutes";

const app = express();
app.use(express.json());
app.use(cookieParser());

const origins = process.env.FRONTEND_URL?.split(",");
const allowedOrigins:cors.CorsOptions = {
  origin:(origin, callback)=>{

    //allow same origin
    if(!origin) {
      return callback(null, true);
    }

    if(process.env.NODE_ENV=="development" || origins?.indexOf(origin)!==-1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors!"));
    }
  },

  credentials:true,
  methods:["GET", "POST", "PUT", "DELETE"],
  allowedHeaders:['content-type', 'Authorization']

}

app.use(cors(allowedOrigins));

app.get("/", (req,res)=>{
  res.json("Less go, Working!")
});


const PORT = process.env.PORT;
const connectionString = process.env.MONGO_URI;

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/worker", workerRoues);

async function connectDB() {
  if (!connectionString) {
    console.log(`please provide valid uri`);
    return;
  }
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log(`Successfully connected to the DB`);
      app.listen(PORT, () => {
        console.log(`Server is listening to PORT ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(`Error while conecting to DB ${err}`);
    });
}
connectDB();
