import Number from "../models/numberModel.js";
import Comment from "../models/commentModel.js";
import mongoose from 'mongoose'

const createNumber = async (req, res) => {
    try {
        const {
            comment,
            number,
            countryCode,
            countryName,
            status
        } = req.body;

        //comment func. gonder, filter edilen yorumu degiskene at
        const filteredComment = filterComment(comment);

        if (filteredComment !== comment) {
            return res.status(400).json({
                error: "Yorumda istenmeyen içerik bulunmaktadır."
            });
        }

        // Veritabanında telefon numarasını bul
        let phoneNumber = await Number.findOne({
            number
        });

        if (!phoneNumber) {
            // Eğer telefon numarası yoksa, yeni bir numara oluştur
            const newNumber = await Number.create({
                number: number,
                countryCode: countryCode,
                countryName: countryName
            });

            // Oluşturulan yeni numaranın ID'sini al
            const newNumberId = newNumber._id;
            // Yeni numaraya yorum ekle
            const newComment = await Comment.create({
                number: newNumberId,
                comment: filteredComment,
                status: status,
            });
 
        } else {
            // Eğer telefon numarası varsa, varolan numaraya yorum ekle
            const newComment = await Comment.create({
                number: phoneNumber._id,
                comment: filteredComment,
                status: status,
            });
 
        }

        res.json({
            message: "Yorum Başarılı Sekilde Oluşturuldu"
        });
    } catch (error) {
        console.log("Hata:", error);
        res.status(500).json({
            error: error.message
        });
    }
};

function filterComment(comment) {

    //replace comment icinden argo kelimeleri temizle,  argo kelimelerin yerine "" ile degistir
    const filteredComment = comment.replace(/fuck|küfür|küfür3|argo|argo2|argo3/gi, '');
    return filteredComment;
}

const getComment = async (req, res) => {
    try {
        const comment = (await Comment.find().populate('number')).reverse();

        res.status(201).json({
            success: true,
            data: comment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//objectId hatasi var
const getCommentNumber = async (req, res) => {
    try {
        const id = req.params.id;

        const lastEightDigits = id.slice(-7);

        // Tam olarak numaranın eşleştiği bir numara var mı kontrol etme
        let numbers = await Number.find({ number: lastEightDigits });

        // Eğer tam eşleşen bir numara bulunamazsa, son 8 karakterle eşleşen numaraları ara
        if (!numbers || numbers.length === 0) {
            numbers = await Number.find({ number: { $regex: lastEightDigits } });
        }

        if (!numbers || numbers.length === 0) {
            return res.status(404).json({
                success: false,
                // error: "Numara bulunamadı"
            });
        }

        // Her bir numaraya ait yorumları bul ve dizi icerisine at
        const allComments = [];
        for (const number of numbers) {
            const comments = (await Comment.find({ number: number._id }).populate("number")).reverse();
            allComments.push(...comments);
        }

        if (allComments.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Yorum bulunamadı"
            });
        }

        // Yorumları düzenleme ve tarih formatlama
        const formattedComments = allComments.map(comment => ({
            ...comment.toObject(),
            createdAt: comment.createdAt.toLocaleDateString("tr-TR")
        }));

        res.status(200).json({
            success: true,
            data: formattedComments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Sunucu hatası"
        });
    }
};






const commentDelete = async (req, res) => {
    try {

        const id = req.params.id

        await Comment.findByIdAndDelete({
            _id: req.params.id
        })

        res.status(201).json({
            succeded: true,
            message: "başarıyla Silindi."
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

//belirsiz yorumlar gerek yok
const getUncertainComment = async (req, res) => {
    try {
        const uncertainComment = await Comment.find({
            status: "uncertain"
        })

        res.status(200).json({
            success: true,
            data: uncertainComment
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


export {
    createNumber,
    getCommentNumber,
    commentDelete,
    getComment
};