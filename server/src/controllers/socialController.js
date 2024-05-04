import Social from "../models/socialModal.js"



const createSocial = async (req, res) => {
    try {
        await Social.create(req.body)

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

const getSocial = async (req, res) => {

    try {
        const social = (await Social.find()).reverse();
        res.status(201).json({
            succeded: true,
            data: social
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


const updateSocial = async (req, res) => {


    try { 
        const id = req.params.id;

        const {
            facebook,
            instagram,
            twitter,
            linkedin
        } = req.body;
            
         const updatedSocial = await Social.findByIdAndUpdate(
            id, {
                facebook,
                instagram,
                twitter,
                linkedin
            }, {
                new: true,
                runValidators: true
            }
        );

        if (!updatedSocial) {
            return res.status(404).json({
                success: false,
                error: "sosyal medya Bulunamadı."
            });
        }

        res.status(200).json({
            success: true,
            data: updatedSocial,
            message: "Başarıyla Güncellendi."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};





export {
    createSocial,
    getSocial,
    updateSocial,

}