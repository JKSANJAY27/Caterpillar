import mongoose from "mongoose";

const batterySchema = new mongoose.Schema({
    batteryMake: {
        type: String,
        required: [true, "Battery Make is Required"],
    },
    batteryReplacementDate: {
        type: Date,
        required: [true, "Battery Replacement Date is Required"],
    },
    batteryVoltage: {
        type: String,
        required: [true, "Battery Voltage is Required"],
    },
    batteryWaterLevel: {
        type: String,
        enum: ["Good", "Ok", "Low"],
        required: [true, "Battery Water Level is Required"],
    },
    batteryCondition: {
        type: String,
        enum: ["Yes", "No"],
        required: [true, "Battery Condition is Required"],
    },
    batteryImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    batteryIssue: {
        type: String,
        required: [true, "Battery issue is Required"],
    },
    summary: {
        type: String
    },
});

export const Battery = mongoose.model("Battery", batterySchema);