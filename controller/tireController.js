import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Tire } from "../models/tireSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const tire = catchAsyncErrors(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Images required", 400));
    }
    const {lfImage, rfImage, lrImage, rrImage} = req.files;
    if (!lfImage || !rfImage || !lrImage || !rrImage) {
        return next(new ErrorHandler("All images are required", 400));
    }
    const uploadImage = async (image, folder) => {
        try {
            const response = await cloudinary.uploader.upload(image.tempFilePath, { folder });
            return response;
        } catch (error) {
            console.error(`Cloudinary Error for ${folder}:`, error);
            throw new Error(`Error uploading ${folder} image`);
        }
    };

    const [cloudinaryResponseForlfImage, cloudinaryResponseForrfImage, cloudinaryResponseForlrImage, cloudinaryResponseForrrImage] = await Promise.all([
        uploadImage(lfImage, "lfImage"),
        uploadImage(rfImage, "rfImage"),
        uploadImage(lrImage, "lrImage"),
        uploadImage(rrImage, "rrImage")
    ]);

    // Extract other fields from request body
    const {
        lfPressure, lfCondition,
        rfPressure, rfCondition,
        lrPressure, lrCondition,
        rrPressure, rrCondition
    } = req.body;

    // Create new tire entry
    const tire = await Tire.create({
        lfPressure,
        lfCondition,
        lfImage: {
            public_id: cloudinaryResponseForlfImage.public_id,
            url: cloudinaryResponseForlfImage.secure_url,
        },
        rfPressure,
        rfCondition,
        rfImage: {
            public_id: cloudinaryResponseForrfImage.public_id,
            url: cloudinaryResponseForrfImage.secure_url,
        },
        lrPressure,
        lrCondition,
        lrImage: {
            public_id: cloudinaryResponseForlrImage.public_id,
            url: cloudinaryResponseForlrImage.secure_url,
        },
        rrPressure,
        rrCondition,
        rrImage: {
            public_id: cloudinaryResponseForrrImage.public_id,
            url: cloudinaryResponseForrrImage.secure_url,
        },
    });

    res.status(201).json({ success: true, tire });
});

export default tire;