import mongoose from "mongoose";

const tireSchema = new mongoose.Schema({
    lfPressure: {
        type: Number,
        required: [true, "Left Front Tire Pressure Required"],
    },
    lfCondition:{
        type: String,
        enum: ["Good", "Ok", "Needs Replacement"],
        required: [true, "Left Front Tire Condition Required"],
    },
    lfImage:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    rfPressure: {
        type: Number,
        required: [true, "Left Front Tire Pressure Required"],
    },
    rfCondition:{
        type: String,
        enum: ["Good", "Ok", "Needs Replacement"],
        required: [true, "Left Front Tire Condition Required"],
    },
    rfImage:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    lrPressure: {
        type: Number,
        required: [true, "Left Front Tire Pressure Required"],
    },
    lrCondition:{
        type: String,
        enum: ["Good", "Ok", "Needs Replacement"],
        required: [true, "Left Front Tire Condition Required"],
    },
    lrImage:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    rrPressure: {
        type: Number,
        required: [true, "Left Front Tire Pressure Required"],
    },
    rrCondition:{
        type: String,
        enum: ["Good", "Ok", "Needs Replacement"],
        required: [true, "Left Front Tire Condition Required"],
    },
    rrImage:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    summary:{
        type: String,
    }
});

export const Tire = mongoose.model("Tire", tireSchema);