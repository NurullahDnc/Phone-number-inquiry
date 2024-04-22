import Number from "../models/numberModel.js";

 

const getNumber = async (req, res) => {

    try {
        const numbers = (await Number.find()).reverse();
        res.status(201).json({
            succeded: true,
            data: numbers
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const NumberDelete = async (req, res) => {
    try {

        const id = req.params.id

        await Number.findByIdAndDelete({
            _id: req.params.id
        })

        res.status(201).json({
            succeded: true,
            message: "başarıyla Silindi."
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            error: "hata oluştu."
        });
    }
}

export {
    getNumber,
    NumberDelete,
};