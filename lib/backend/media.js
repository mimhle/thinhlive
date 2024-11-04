import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})

export async function upload(img) {
    const uploadResult = await cloudinary.uploader
        .upload(img)
        .catch((error) => {
            console.log(error);
        });
    return uploadResult;
}