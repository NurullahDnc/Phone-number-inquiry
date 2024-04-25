import Faq from "../models/faqModel.js"



const createFaq = async (req, res) => {
    try {
        await Faq.create(req.body)

        res.status(201).json({
            succeded: true,
            message: "başarıyla oluşturuldu."
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const getFaq = async (req, res) => {

    try {
        const faq = (await Faq.find()).reverse();
        res.status(201).json({
            succeded: true,
            data: faq
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const deleteFaq = async (req, res) => {

    try {
        const {
            id
        } = req.params
        const faq = await Faq.findByIdAndDelete({
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

const updateFaq = async (req, res) => {
    
    try {
        const id = req.params.id;
        const {
            title,
            description,
        } = req.body; 
        const updateFaq = await Faq.findByIdAndUpdate(
            id, {
                title,
                description,
            }, {
                new: true,
                runValidators: true
            }  
        );

        if (!updateFaq) {
            return res.status(404).json({
                success: false,
                error: "bulunamadı."
            });
        }

        res.status(200).json({
            success: true,
            data: updateFaq ,
            message: "başarıyla güncellendi"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};



export {
    createFaq,
    getFaq,
    deleteFaq,
    updateFaq,
}