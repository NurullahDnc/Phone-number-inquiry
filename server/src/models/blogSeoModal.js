import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const blogSeoSchema = new Schema({
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

const BlogSeo = mongoose.model('BlogSeo', blogSeoSchema);

export default BlogSeo;

