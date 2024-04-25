import Admin from "../models/adminModal.js"
import {createAccessToken} from '../helpers/GenerateToken.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const createUser = async (req, res) => {

    try {
        const {
           
            email,
            password
        } = req.body;

        const existingUser = await Admin.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "bu kullanıcı zaten kayıtlı"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Admin.create({
           
            email: email,
            password: hashedPassword,
        })

        res.status(201).json({
            succeded: true,
            message: "Üyelik başarıyla oluşturuldu."
        })

    } catch (error) {

        res.status(400).json({
            succeded: false,
            error: error.message
        })

    }
}


const login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;

        const admin = await Admin.findOne({
            email: email
        })

        if (!admin) {
            return res.status(401).json({
                succeded: false,
                error: "Yanlış e-posta!"
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.status(500).json({
                message: 'Yanlış şifre'
            })
        }

        //kulanıcının ıd gore token olusturuyor.
        const accessToken = createAccessToken({
            id: admin._id
        });

        res.status(201).json({
            succeded: true,
            accessToken,
            message: "Giriş Başarılı."
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}



const resetPassword = async (req, res) => {

    var {
        oldPassword,
        password,
        password2
    } = req.body;
    const id = req.params.id;


    const admin = await Admin.findOne({
        _id: id
    });


    const isMatch = await bcrypt.compare(oldPassword, admin.password)

    if (!isMatch) {
        return res.status(401).json({
            succeded: false,
            error: "Sifre Yanlış!"
        })
    }

    //------------ Checking required fields ------------//
    else if (!oldPassword || !password || !password2) {
        return res.status(401).json({
            succeded: false,
            error: "Lütfen Tüm Alanları Doldurunuz!"
        })
    }

    //------------ Checking password length ------------//
    else if (password.length < 8 || password2.length < 8) {
        return res.status(401).json({
            succeded: false,
            error: "Şifre en az 8 karakter olmalıdır."
        })
    }


    //------------ Checking password mismatch ------------//
    if (password.toLowerCase() !== password2.toLowerCase()) {
        return res.status(401).json({
            succeded: false,
            error: "Parolalar uyuşmuyor!"
        })

    }

    // Yeni şifrenin hashlenmesi
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni şifrenin veritabanına kaydedilmesi
    await Admin.findByIdAndUpdate(id, {
        password: hashedPassword
    });

    res.status(201).json({
        succeded: true,
        message: "Şifre başarıyla güncellendi."
    })
}


export {
    login,
    resetPassword,createUser

}