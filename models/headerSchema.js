import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const headerSchema = new mongoose.Schema({
    truckNumber : {
        type: String,
        required: [true, "Truck Serial Number Required"],
    },
    truckModel : {
        type: String,
        required: [true, "Truck Model Required"],
    },
    inspectionID : {
        type: Number,
        required: [true, "Inspection ID Required"],
        unique: true,
    },
    employeeID : {
        type: Number,
        required: [true, "Employee ID Required"],
        unique: true,
    },
    date : {
        type: Date,
        required: [true, "Date Required"],
        default: Date.now,
    },
    location : {
        type: String,
        required: [true, "Location Required"],
    },
    odometer : {
        type: Number,
        required: [true, "Odometer Reading Required"],
    },
    customerID : {
        type: String,
        required: [true, "Customer ID Required"],
    },
    inspectionSign: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    },
});

headerSchema.methods.generateJsonWebToken= function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
}

export const HeaderSection = mongoose.model("Header", headerSchema);