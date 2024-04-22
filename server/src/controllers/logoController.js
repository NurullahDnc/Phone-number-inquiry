import Logo from '../models/logoModal.js';
import {
    v2 as cloudinary
} from 'cloudinary';

import fs from "fs"

const createLogo = async (req, res) => {

    console.log(req.body);
 
    try {
        //cloudinary kayıt et image'yi
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath, {
                use_filename: true,
                folder: 'numericquery',
            }
        );
console.log("res", result);
        const {
            logo,
            
        } = req.body;

        await Logo.create({
            image: result.secure_url,
            logo,
            image_id: result.public_id,

        });

        //resim ekledikten sonra sil
        fs.unlinkSync(req.files.image.tempFilePath)

        res.status(200).json({
            success: true,
            message: "başarıyla oluşturuldu.",
         });

    } catch (error) {
        
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


const getLogo = async (req, res) => {
    try {

        const logo = (await Logo.find()).reverse();

        res.status(200).json({
            success: true,
            data: logo
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}



const updateLogo = async (req, res) => {
    try {

        const {
            id
        } = req.params;

        const {
            logo,
         } = req.body;

 
         const photo = await Logo.findById(req.params.id);
        //resim yukleme
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);

        // Eski fotoğrafın id'sini al
        const imagePublicId = photo.image_id;

        const updatedLogo = await Logo.findByIdAndUpdate(
            id, {
                logo,
                image: result.secure_url,
                image_id: imagePublicId

            }, {
                new: true,
                runValidators: true
            } // Yeni veriyi döndür ve doğrulayıcıları çalıştır
        );

        fs.unlinkSync(req.files.image.tempFilePath)

        res.status(200).json({
            data: updatedLogo,
            message: "logo başarıyla Güncellendi"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
};


export {
    createLogo,
    updateLogo,
    getLogo,
    
}