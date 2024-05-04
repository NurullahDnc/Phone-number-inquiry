import CommentFeedback from "../models/commentFeedbackModal.js"
import Comment from "../models/commentModel.js"
import Number from "../models/numberModel.js"



const createCommentFeedback = async (req, res) => {
        try {
        const {
            id,
            surname,
            mail,
            description,
        } = req.body;

        //gelen commentin id gore yorumu buluyor, yorum id gore de telefon numarasını
        const comment = await Comment.findOne({
            _id : id
        })

        const phoneNumber = await Number.findOne({
            _id : comment.number
        })

         await CommentFeedback.create({
            comment: id,
            number: phoneNumber._id,
            surname,
            mail,
            description,
        })

        res.status(201).json({
            succeded: true,
            message: "Talebiniz oluşturuldu."
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Hata oluştu."
        });
    }
}

const getCommentFeedback = async (req, res) => {

    try {
        const commentFeedback = (await CommentFeedback.find().populate('comment').populate('number')).reverse();
        res.status(201).json({
            succeded: true,
            data: commentFeedback
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const deleteCommentFeedback = async (req, res) => {

    try {
        const {
            id
        } = req.params
        await CommentFeedback.findByIdAndDelete({
            _id: id
        })

        res.status(201).json({
            succeded: true,
            message: "başarıyla Silindi."
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
 



export {
    createCommentFeedback,
    deleteCommentFeedback,
    getCommentFeedback,
 }