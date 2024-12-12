import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'checkpoint-zone'); 

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
            formData, { headers: {'Content-Type': 'multipart/form-data',},
        });

        return response.data.secure_url; 
    } catch {
        throw new Error('Error al subir la imagen');
    }
};

export default uploadImageToCloudinary;
