import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "worker"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    place: {
      type: String,
      required: true,
    },
    // ordersData:[
    //   {
    //     type: ObjectId,
    //     ref: "Orders",
    //   },
    // ],
  adminId:{
      type:ObjectId,
      ref:"Users"
    }
  },
  {
    timestamps: true,
  }
);

const orderSchema = new Schema({
  customerId: {
    type: ObjectId,
    ref: "Customers",
    required: true,
  },
  ordersData: [
    {
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],

  totalAmount: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Delivered", "Cancelled"],
    default: "Pending",
  },
  description: { type: String, default: "" },
  deliveryDate: { type: Date, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },

  adminId:{
    type:ObjectId,
    ref:"Users"
  }

}, {
  timestamps:true,
});

const workersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    required:true,
    unique:true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  place:{
    type:String,
    required:true,
  },
  description: {
    type: String,
  },
  joinDate: {
    type: Date,
    required: true,
  },

  workData: [
    {
      date: Date,
      work: String,
      amount: Number,
    },
  ],
  adminId : {
    type:ObjectId,
    ref:"Users"
  }
});




const workerLinks = new Schema({
  hash:{
    type:String,
    required:true
  },
  workerId : {
    type:ObjectId,
    ref:"Workers",
    required:true,
    unique:true
  },
  adminId: {
    type:ObjectId,
    ref:"Users",
    required:true
  }
});


const Users = mongoose.model("User", userSchema);
const Customers = mongoose.model("Customers", customerSchema);
const Orders = mongoose.model("Orders", orderSchema);
const Workers = mongoose.model("Workers", workersSchema);
const WorkersLinks = mongoose.model("WorkersLinks", workerLinks);

export { Users, Customers, Orders, Workers, WorkersLinks };
