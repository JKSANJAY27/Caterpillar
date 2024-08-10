import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    feedback: {
        type: String,
    },
    feedbackImage: {
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

export const Feedback = mongoose.model("Feedback", feedbackSchema);