import uploadImagecloudinary from "../utils/uploadImagecloudinary.js"

const uploadImageController = async(request,response)=>{
    try {
        const file = request.file

        if (!file) {
            return response.status(400).json({
                message: "No file uploaded",
                error: true,
                success: false
            })
        }

        // Check if Cloudinary environment variables are configured
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET_KEY) {
            console.error("Cloudinary environment variables are not configured")
            return response.status(500).json({
                message: "Image upload service is not configured properly",
                error: true,
                success: false
            })
        }

        const uploadImage = await uploadImagecloudinary(file)

        if (!uploadImage || !uploadImage.secure_url) {
            return response.status(500).json({
                message: "Failed to upload image to cloud storage",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Upload done",
            data: uploadImage.secure_url,
            success: true,
            error: false
        })
    } catch (error) {
        console.error("Upload error:", error)
        return response.status(500).json({
            message: error.message || "Internal server error during upload",
            error: true,
            success: false
        })
    }
}

export default uploadImageController