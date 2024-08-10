import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from "../middleware/error.js";
import { Brakes } from "../models/brakesSchema.js";

export const brakes = catchAsyncErrors(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Images required", 400));
    }
    const {brakeImage} = req.files;
    if (!brakeImage){
        return next(new ErrorHandler("Brake image is required", 400));
    }
    const cloudinaryResponseForBrakeImage = await cloudinary.uploader.upload(brakeImage.tempFilePath,
        {folder: "Brakes_Image"});
     if (!cloudinaryResponseForBrakeImage || cloudinaryResponseForBrakeImage.error) {
       console.error("Cloudinary Error:", cloudinaryResponseForBrakeImage.error || "Unknown Cloudinary error");
    }
    const {
        brakeFluidLevel,
        frontBrakeCondition,
        rearBrakeCondition,
        emergencyBrake,
        summary
    } = req.body;
    const brakes = await Brakes.create({
        brakeFluidLevel,
        frontBrakeCondition,
        rearBrakeCondition,
        emergencyBrake,
        summary,
        brakeImage : {
            public_id: cloudinaryResponseForBrakeImage.public_id,
            url: cloudinaryResponseForBrakeImage.secure_url,
        }
    });
    res.status(201).json({ success: true, brakes });
});

export default brakes;