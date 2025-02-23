import express, { Express, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import cookieParser from 'cookie-parser';
import userRoutes from "./Routes/userRoutes";
import customerRoutes from "./Routes/customerRoutes";
import orderRoutes from "./Routes/orderRoutes";
import workerRoues from "./Routes/workerRoutes";

const app = express();
app.use(express.json());
app.use(cookieParser());

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
