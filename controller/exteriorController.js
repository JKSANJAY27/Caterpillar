import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Exterior } from "../models/exteriorSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const exterior = catchAsyncErrors(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Images required", 400));
    }
    const {exteriorImage} = req.files;
    if (!exteriorImage){
        return next(new ErrorHandler("All images are required", 400));
    }
    const cloudinaryResponseForExteriorImage = await cloudinary.uploader.upload(exteriorImage.tempFilePath,
        {folder: "Exterior_Image"});
     if (!cloudinaryResponseForExteriorImage || cloudinaryResponseForExteriorImage.error) {
       console.error("Cloudinary Error:", cloudinaryResponseForExteriorImage.error || "Unknown Cloudinary error");
    }
    const {
        exteriorCondition,
        oilLeak,
        summary
    } = req.body;
    const exterior = await Exterior.create({
        exteriorCondition,
        oilLeak,
        summary,
        exteriorImage: {
            public_id: cloudinaryResponseForExteriorImage.public_id,
            url: cloudinaryResponseForExteriorImage.secure_url,
        }
    });
    res.status(201).json({ success: true, exterior });
});

export default exterior;