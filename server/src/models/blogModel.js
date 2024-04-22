import mongoose from 'mongoose'

const {
    Schema
} = mongoose;



const BlogSchema = new Schema({

    image: {
        type: String,
     },
    title: {
        type: String,
        required: true,
     },
     description: {
        type: String,
        required: true,
     },
    image_id: {
        type: String,
      },

}, {
    timestamps: true,

});


const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;

