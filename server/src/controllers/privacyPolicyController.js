import PrivacyPolicy from "../models/privacyPolicyModel.js"



const createPrivacyPolicy = async (req, res) => {
    try {
        await PrivacyPolicy.create(req.body)

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

const getPrivacyPolicy = async (req, res) => {

    try {
        const privacyPolicy = (await PrivacyPolicy.find()).reverse();
        res.status(201).json({
            succeded: true,
            data: privacyPolicy
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const deletePrivacyPolicy = async (req, res) => {

    try {
        const {
            id
        } = req.params
        const faq = await PrivacyPolicy.findByIdAndDelete({
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

 
const updatePrivacyPolicy = async (req, res) => {
    const id = req.params.id;

    const {
        privacyStatement,
        dataAccess,
        dataProtection,
        contact
    } = req.body; 

    try {
        const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
            id, 
            {
                privacyStatement,
                dataAccess,
                dataProtection,
                contact
            }, 
            {
                new: true,
                runValidators: true
            }  
        );

        if (!updatedPolicy) {
            return res.status(404).json({
                success: false,
                error: "Politika Bulunamadı."
            });
        }

        res.status(200).json({
            success: true,
            data: updatedPolicy,
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
    // createPrivacyPolicy,
    // deletePrivacyPolicy,
    getPrivacyPolicy,
    updatePrivacyPolicy,
}