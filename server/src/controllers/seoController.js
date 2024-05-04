import Detail from "../models/detailSeoModal.js"
import Blog from "../models/blogSeoModal.js"
import BlogDetail from "../models/blogDetailSeoModal.js"


//detail seo create
const createDetailSeo = async (req, res) => {
    try {
        await Detail.create(req.body)

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

//detail get seo
const getDetailSeo = async (req, res) => {

    try {
        const seo = (await Detail.find()).reverse();
        res.status(201).json({
            succeded: true,
            data: seo
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

//detail update seo
const updateDetailSeo = async (req, res) => {
    const id = req.params.id;

    const {
        keywords,
        description
    } = req.body;

    try {
        const updateSeo = await Detail.findByIdAndUpdate(
            id, {
                keywords,
                description,

            }, {
                new: true,
                runValidators: true
            }
        );

        if (!updateSeo) {
            return res.status(404).json({
                success: false,
                error: "Bulunamadı."
            });
        }

        res.status(200).json({
            success: true,
            data: updateSeo,
            message: "Başarıyla Güncellendi."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


//create blog seo
const createBlogSeo = async (req, res) => {
    try {
        await Blog.create(req.body)

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

//get blog seo
const getBlogSeo = async (req, res) => {

    try {
        const seo = (await Blog.find()).reverse();
        res.status(201).json({
            succeded: true,
            data: seo
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

//update blog seo 
const updateBlogSeo = async (req, res) => {
    const id = req.params.id;

    const {
        keywords,
        description
    } = req.body;

    try {
        const updateSeo = await Blog.findByIdAndUpdate(
            id, {
                keywords,
                description,

            }, {
                new: true,
                runValidators: true
            }
        );

        if (!updateSeo) {
            return res.status(404).json({
                success: false,
                error: "Bulunamadı."
            });
        }

        res.status(200).json({
            success: true,
            data: updateSeo,
            message: "Başarıyla Güncellendi."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//create blog detail
const createBlogDetailSeo = async (req, res) => {
    try {
        await BlogDetail.create(req.body)

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

const getBlogDetailSeo = async (req, res) => {

    try {
        const seo = (await BlogDetail.find()).reverse();
        res.status(201).json({
            succeded: true,
            data: seo
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const updateBlogDetailSeo = async (req, res) => {
    const id = req.params.id;

    const {
        keywords,
        description
    } = req.body;

    try {
        const updateSeo = await BlogDetail.findByIdAndUpdate(
            id, {
                keywords,
                description,

            }, {
                new: true,
                runValidators: true
            }
        );

        if (!updateSeo) {
            return res.status(404).json({
                success: false,
                error: "Bulunamadı."
            });
        }

        res.status(200).json({
            success: true,
            data: updateSeo,
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
    createDetailSeo,
    getDetailSeo,
    updateDetailSeo,

    createBlogSeo,
    getBlogSeo,
    updateBlogSeo,

    createBlogDetailSeo,
    getBlogDetailSeo,
    updateBlogDetailSeo

}