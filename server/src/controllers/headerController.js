import Header from '../models/headerModal.js';
import {
    v2 as cloudinary
} from 'cloudinary';

import fs from "fs"

const createHeader = async (req, res) => {

    try {
        //cloudinary kayıt et image'yi
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath, {
                use_filename: true,
                folder: 'numericquery',
            }
        );
 
        const {
            title,
            description,
        } = req.body;

        await Header.create({
            image: result.secure_url,
            title,
            description,
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


const getHeader = async (req, res) => {
    try {

        const header = (await Header.find()).reverse();

        res.status(200).json({
            success: true,
            data: header
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}



const updateHeader = async (req, res) => {
    try {

        const {
            id
        } = req.params;

        const {
            title,
            description,
        } = req.body;

        const photo = await Header.findById(id);

        let image = req.body.image;

        if (!image) {
            //resim yukleme
            const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            image = result.secure_url;
        }
        // Eski fotoğrafın id'sini al
        const imagePublicId = photo.image_id;

        const updatedHeader = await Header.findByIdAndUpdate(
            id, {
                title,
                description,
                image,
                image_id: imagePublicId

            }, {
                new: true,
                runValidators: true
            } // Yeni veriyi döndür ve doğrulayıcıları çalıştır
        );

        // Dosyayı sil
        if (req.files && req.files.image) {
            fs.unlinkSync(req.files.image.tempFilePath);
        }


        res.status(200).json({
            data: updatedHeader,
            message: "Header başarıyla Güncellendi"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
};


export {
    // createHeader,
    updateHeader,
    getHeader,

}