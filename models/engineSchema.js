import mongoose from "mongoose";

const engineSchema = new mongoose.Schema({
    engineCondition: {
        type: String,
        enum: ["Yes", "No"],
        required: [true, "Is there any Rust, Dents or Damage in Engine?"],
    },
    engineImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    engineOilCondition: {
        type: String,
        enum: ["Good", "Bad"],
        required: [true, "Engine Oil Condition is Required"],
    },
    engineOilColor: {
        type: String,
        required: [true, "Engine Oil Colour is Required"],
    },
    brakeFluidCondition: {
        type: String,
        enum: ["Good", "Bad"],
        required: [true, "Brake Fluid Condition is Required"],
    },
    brakeFluidColor: {
        type: String,
        required: [true, "Brake Fluid Colour is Required"],
    },
    oilLeak: {
        type: String,
        enum: ["Yes", "No"],
        required: [true, "Enter if the oil is leaking in the engine"],
    },
    summary: {
        type: String,
    }
});

export const Engine = mongoose.model("Engine", engineSchema);