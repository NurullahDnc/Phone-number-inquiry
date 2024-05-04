import mongoose from 'mongoose'

const {
    Schema
} = mongoose;



const DownloadSectionSchema = new Schema({

    image: {
        type: String,
    },
    title1: {
        type: String,
        required: true,
    },
    title2: {
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
    appUrl: {
        type: String,
        required: true,
    },
    iosUrl: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,

});


const DownloadSection = mongoose.model('DownloadSection', DownloadSectionSchema);

export default DownloadSection;