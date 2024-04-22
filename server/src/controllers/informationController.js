import Information from '../models/information.js';
import {
    v2 as cloudinary
} from 'cloudinary';

import fs from "fs"

const createInformation = async (req, res) => {

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

        const newInformation = await Information.create({
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
            data: newInformation
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


const getInformation = async (req, res) => {
    try {

        const information = (await Information.find()).reverse();

        res.status(200).json({
            success: true,
            data: information
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}



const deleteInformation = async (req, res) => {
    try {

        //id gore odayı buluyor
        const photo = await Information.findById(req.params.id);

        if (!photo) return res.status(404).json({
            error: "Silinecek resim bulunamadı."
        });

        //resmin id'sini alıyor
        const imagePublicId = photo.image_id;

        //cloudinary'den resmi siliyor
        await cloudinary.uploader.destroy(imagePublicId);

        // gelen id ve db id gore siliyor
        await Information.findByIdAndDelete({
            _id: req.params.id
        });


        res.status(200).json({
            message: 'başarıyla silindi'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}




const updateInformation = async (req, res) => {
    try {

        const {
            id
        } = req.params;

        const {
            title,
            description,
        } = req.body;


        const photo = await Information.findById(req.params.id);

        let image = req.body.image;

        if (!image) {
            //resim yukleme
            const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            image = result.secure_url;
        }
        // Eski fotoğrafın id'sini al
        const imagePublicId = photo.image_id;

        const updatedInformation = await Information.findByIdAndUpdate(
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

        if (!image) {
            fs.unlinkSync(req.files.image.tempFilePath)
        }

        res.status(200).json({
            updatedInformation,
            message: "başarıyla Güncellendi"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
};


export {
    createInformation,
    getInformation,
    deleteInformation,
    updateInformation

}