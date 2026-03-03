import cloudinary from "../config/cloudinaryConfig.js"
import fs from "fs/promises"

export const uploadOnCloudinary = async (localFilePath, folder = "auth-app") => {
  if(!localFilePath) throw new Error("localFilePath is required!");

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder,
      resource_type: "image"
    });

    await fs.unlink(localFilePath);

    return {
      url: response.secure_url,
      public_id: response.public_id
    }
  } catch (error) {
    if(localFilePath)
      await fs.unlink(localFilePath);

    console.log("Error: ", error.message);
    
  }
}