import Country from '../models/countryModal.js';
import {
    v2 as cloudinary
} from 'cloudinary';

import fs from "fs"

const createCountry = async (req, res) => {
    try {
        let image_url = '';
        let image_id = '';

        if (req.files && req.files.image) {
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath, {
                    use_filename: true,
                    folder: 'numericquery',
                }
            );
            image_url = result.secure_url;
            image_id = result.public_id;
            // Resim ekledikten sonra sil
            fs.unlinkSync(req.files.image.tempFilePath);
        }

        const {
            name,
            callingCodes,
            alpha2Code
        } = req.body;

        const newCountry = await Country.create({
            image: image_url,
            name,
            callingCodes,
            alpha2Code,
            image_id: image_id,
        });

        res.status(200).json({
            success: true,
            message: "Başarıyla oluşturuldu.",
            data: newCountry
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


const getCountry = async (req, res) => {
    try {

        const country = (await Country.find()).reverse();

        res.status(200).json({
            success: true,
            data: country
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


const deleteCountry = async (req, res) => {
    try {

        //id gore odayı buluyor
        const photo = await Country.findById(req.params.id);

        //resmin id'sini alıyor
        const imagePublicId = photo.image_id;

        if (imagePublicId.image_id) {

            //cloudinary'den resmi siliyor
            await cloudinary.uploader.destroy(imagePublicId);
        }

        // gelen id ve db id gore siliyor
        await Country.findByIdAndDelete({
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




const updateCountry = async (req, res) => {
    try {

        const {
            id
        } = req.params;

        const {
            name,
            callingCodes,
            alpha2Code,
        } = req.body;


        const photo = await Country.findById(req.params.id);

        let image = req.body.image;

        if (!image) {
            //resim yukleme
            const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            image = result.secure_url;
        }
        // Eski fotoğrafın id'sini al
        const imagePublicId = photo.image_id;

        const updatedCountry = await Country.findByIdAndUpdate(
            id, {
                name,
                callingCodes,
                alpha2Code,
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
            updatedCountry,
            message: "başarıyla Güncellendi"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


export {
    createCountry,
    getCountry,
    deleteCountry,
    updateCountry

}