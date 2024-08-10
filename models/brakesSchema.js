import mongoose from "mongoose";

const brakesSchema = new mongoose.Schema({
    brakeFluidLevel: {
        type: String,
        enum: ["Good", "Ok", "Low"],
        required: [true, "Brake Fluid Level is Required"],
    },
    frontBrakeCondition: {
        type: String,
        enum: ["Good", "Ok", "Needs Replacement"],
        required: [true, "Front Brake Condition is Required"],
    },
    rearBrakeCondition: {
        type: String,
        enum: ["Good", "Ok", "Needs Replacement"],
        required: [true, "Rear Brake Condition is Required"],
    },
    emergencyBrake: {
        type: String,
        enum: ["Good", "Ok", "Low"],
        required: [true, "Emergency Brake Condition is Required"],
    },
    summary: {
        type: String,
    },
    brakeImage: {
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

export const Brakes = mongoose.model("Brakes", brakesSchema);