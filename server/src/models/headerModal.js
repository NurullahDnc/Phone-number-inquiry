import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const HeaderImageSchema = new Schema({
    title: {
        type: String,
        required: true,
     },
     description: {
        type: String,
        required: true,
     },
    image: {
        type: String,
        required: true
    },
    image_id: {
        type: String,
    },

}, {
    timestamps: true
});

const HeaderImage = mongoose.model('HeaderImage', HeaderImageSchema);

export default HeaderImage;