import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { v2 as cloudinary } from "cloudinary";
import { Feedback } from "../models/feedbackSchema.js";

export const feedback = catchAsyncErrors(async(req,res,next)=>{
    const {feedbackImage} = req.files;
    const cloudinaryResponseForFeedbackImage = await cloudinary.uploader.upload(feedbackImage.tempFilePath,
        {folder: "Feedback_Image"});
     if (!cloudinaryResponseForFeedbackImage || cloudinaryResponseForFeedbackImage.error) {
       console.error("Cloudinary Error:", cloudinaryResponseForFeedbackImage.error || "Unknown Cloudinary error");
    }
    const {feedback} = req.body;
    const feedbacks = await Feedback.create({
        feedback,
        feedbackImage: {
            public_id: cloudinaryResponseForFeedbackImage.public_id,
            url: cloudinaryResponseForFeedbackImage.secure_url,
        }
    });
    res.status(201).json({ success: true, feedbacks });
});

export default feedback;