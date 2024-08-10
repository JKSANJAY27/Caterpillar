import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { v2 as cloudinary } from "cloudinary";
import { Engine } from "../models/engineSchema.js";

export const engine = catchAsyncErrors(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Images required", 400));
    }
    const {engineImage} = req.files;
    if (!engineImage){
        return next(new ErrorHandler("Brake image is required", 400));
    }
    const cloudinaryResponseForEngineImage = await cloudinary.uploader.upload(engineImage.tempFilePath,
        {folder: "Engine_Image"});
     if (!cloudinaryResponseForEngineImage || cloudinaryResponseForEngineImage.error) {
       console.error("Cloudinary Error:", cloudinaryResponseForEngineImage.error || "Unknown Cloudinary error");
    }
    const {
        engineCondition,
        engineOilCondition,
        engineOilColor,
        brakeFluidCondition,
        brakeFluidColor,
        oilLeak,
        summary
    } = req.body;
    const engine = await Engine.create({
        engineCondition,
        engineOilCondition,
        engineOilColor,
        brakeFluidCondition,
        brakeFluidColor,
        oilLeak,
        summary,
        engineImage : {
            public_id: cloudinaryResponseForEngineImage.public_id,
            url: cloudinaryResponseForEngineImage.secure_url,
        }
    });
    res.status(201).json({ success: true, engine });
})

export default engine;