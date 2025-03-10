
"use server";

import axios from "axios";

const createImage = async (file: File) => {
    

    const formData = new FormData();
    formData.append("file", file); 
    formData.append("upload_preset", "portfolio-blog"); 

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dqsm6ybdu/image/upload`,
            formData
        );

     
        return response.data.secure_url; 
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default createImage;