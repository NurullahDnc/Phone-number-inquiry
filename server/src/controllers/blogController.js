import Blog from '../models/blogModel.js';
import {
    v2 as cloudinary
} from 'cloudinary';

import fs from "fs"

const createBlog = async (req, res) => {
 
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

        const newBlog = await Blog.create({
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
            data: newBlog
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


const getBlog = async (req, res) => {
    try {

        const blog = (await Blog.find()).reverse();

        res.status(200).json({
            success: true,
            data: blog
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const getDetailBlog = async (req, res) => {

    try {
        const blogs = await Blog.find({
            _id: req.params.id
        })

        res.status(200).json({
            success: true,
            data: blogs
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const deleteBlog = async (req, res) => {
    try {

        //id gore odayı buluyor
        const photo = await Blog.findById(req.params.id);

        if (!photo) return res.status(404).json({
            error: "Silinecek Blog resim bulunamadı."
        });

        //resmin id'sini alıyor
        const imagePublicId = photo.image_id;

        //cloudinary'den resmi siliyor
        await cloudinary.uploader.destroy(imagePublicId);

        // gelen id ve db id gore siliyor
        await Blog.findByIdAndDelete({
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




const updateBlog = async (req, res) => {
    try {

        const {
            id
        } = req.params;

        const {
            title,
            description,
        } = req.body;

        // Güncellenecek blogu bul
        const photo = await Blog.findById(req.params.id);

        let image = req.body.image;
        if(!req.body.image){
        //resim yukleme
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
image = result.secure_url;
    }
    // Eski fotoğrafın id'sini al
    const imagePublicId = photo.image_id;

        const updatedBlog = await Blog.findByIdAndUpdate(
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
        if(!req.body.image){
         fs.unlinkSync(req.files.image.tempFilePath)
        }
        res.status(200).json({
            updatedBlog,
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
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog,
    getDetailBlog
}