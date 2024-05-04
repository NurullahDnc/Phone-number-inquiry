import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const blogDetailSeoSchema = new Schema({
    description: {
        type: String,
        required: true,
     },
     keywords: {
        type: String,
        required: true,
     },
 

}, {
    timestamps: true
});

const BlogDetailSeo = mongoose.model('BlogDetailSeo', blogDetailSeoSchema);

export default BlogDetailSeo;

