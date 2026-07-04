import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";

// @desc  Upload image to Cloudinary
// @route POST /api/upload
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const uploadFromBuffer = (fileBuffer) =>
    new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "shopverse/products" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      uploadStream.end(fileBuffer);
    });

  const result = await uploadFromBuffer(req.file.buffer);

  res.status(200).json({
    message: "Image uploaded successfully",
    url: result.secure_url,
    public_id: result.public_id,
  });
});

export { uploadImage };
