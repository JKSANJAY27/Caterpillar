import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import {HeaderSection} from "../models/headerSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

export const header = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Inspection Signature is Required!", 400));
    }
    const {inspectionSign} = req.files;
    const cloudinaryResponseForInspectionSign = await cloudinary.uploader.upload(inspectionSign.tempFilePath,
       {folder: "Signature"});
    if (!cloudinaryResponseForInspectionSign || cloudinaryResponseForInspectionSign.error) {
      console.error("Cloudinary Error:", cloudinaryResponseForInspectionSign.error || "Unknown Cloudinary error");
    }
    const {
        truckNumber,
        truckModel,
        inspectionID,
        employeeID,
        date,
        location,
        odometer,
        customerID
    } = req.body;
    const headerPart = await HeaderSection.create({
        truckNumber,
        truckModel,
        inspectionID,
        employeeID,
        date,
        location,
        odometer,
        customerID,
        inspectionSign: {
            public_id: cloudinaryResponseForInspectionSign.public_id,
            url: cloudinaryResponseForInspectionSign.secure_url,
        }
    });
    generateToken(headerPart, "Header Completed!", 201, res)
});

export default header;