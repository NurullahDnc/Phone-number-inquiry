import DownloadSection from '../models/downloadSectionModal.js';
import {
    v2 as cloudinary
} from 'cloudinary';

import fs from "fs"

const createDownloadSection = async (req, res) => {

    try {
        //cloudinary kayıt et image'yi
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath, {
                use_filename: true,
                folder: 'numericquery',
            }
        );

        const {
            title1,
            title2,
            description,
            appUrl,
            iosUrl
        } = req.body;

        const newDownloadSection = await DownloadSection.create({
            image: result.secure_url,
            title1,
            title2,
            description,
            appUrl,
            iosUrl,
            image_id: result.public_id,

        });

        //resim ekledikten sonra sil
        fs.unlinkSync(req.files.image.tempFilePath)

        res.status(200).json({
            success: true,
            message: "başarıyla oluşturuldu.",
            data: newDownloadSection
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


const getDownloadSection = async (req, res) => {
    try {

        const downloadSection = (await DownloadSection.find()).reverse();

        res.status(200).json({
            success: true,
            data: downloadSection
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


const deleteDownloadSection = async (req, res) => {
    try {

        //id gore odayı buluyor
        const photo = await DownloadSection.findById(req.params.id);

        if (!photo) return res.status(404).json({
            error: "Silinecek resim bulunamadı."
        });

        //resmin id'sini alıyor
        const imagePublicId = photo.image_id;

        //cloudinary'den resmi siliyor
        await cloudinary.uploader.destroy(imagePublicId);

        // gelen id ve db id gore siliyor
        await DownloadSection.findByIdAndDelete({
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




const updateDownloadSection = async (req, res) => {
    try {

        const { 
            id
        } = req.params;

        const {
            title1,
            title2,
            description,
            appUrl,
            iosUrl
        } = req.body;

        // Güncellenecek blogu bul
        const photo = await DownloadSection.findById(req.params.id);

        let image = req.body.image;
        if (!req.body.image) {
            //resim yukleme
            const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            image = result.secure_url;
        }
        // Eski fotoğrafın id'sini al
        const imagePublicId = photo.image_id;

        const updatedDownloadSection = await DownloadSection.findByIdAndUpdate(
            id, {
                title1,
                title2,
                description,
                image,
                appUrl,
                iosUrl,
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
            updatedDownloadSection,
            message: "blog başarıyla Güncellendi"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
};


export {
    createDownloadSection,
    getDownloadSection,
    deleteDownloadSection,
    updateDownloadSection,
 
}