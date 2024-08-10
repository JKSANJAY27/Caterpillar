import mongoose from "mongoose";

const exteriorSchema = new mongoose.Schema({
    exteriorCondition: {
        type: String,
        enum: ["Yes", "No"],
        required: [true, "Exterior Condition Required"],
    },
    exteriorImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    oilLeak: {
        type: String,
        enum: ["Yes", "No"],
        required: [true, "Exterior Condition Required"],
    },
    summary: {
        type: String,
    }
});

export const Exterior = mongoose.model("Exterior", exteriorSchema);