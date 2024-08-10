import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Battery } from "../models/batterySchema.js";
import { v2 as cloudinary } from "cloudinary";

export const battery = catchAsyncErrors(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Images required", 400));
    }
    const {batteryImage} = req.files;
    if (!batteryImage){
        return next(new ErrorHandler("Battery Image is required", 400));
    }
    const cloudinaryResponseForBatteryImage = await cloudinary.uploader.upload(batteryImage.tempFilePath,
        {folder: "Battery_Image"});
     if (!cloudinaryResponseForBatteryImage || cloudinaryResponseForBatteryImage.error) {
       console.error("Cloudinary Error:", cloudinaryResponseForBatteryImage.error || "Unknown Cloudinary error");
    }
    const {
        batteryMake,
        batteryReplacementDate,
        batteryVoltage,
        batteryWaterLevel,
        batteryCondition,
        batteryIssue,
        summary
    } = req.body;
    const battery = await Battery.create({
        batteryMake,
        batteryReplacementDate,
        batteryVoltage,
        batteryWaterLevel,
        batteryCondition,
        batteryIssue,
        summary,
        batteryImage: {
            public_id: cloudinaryResponseForBatteryImage.public_id,
            url: cloudinaryResponseForBatteryImage.secure_url,
        }
    });
    res.status(201).json({ success: true, battery });
});

export default battery;