import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const InformationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
    },

    image_id: {
        type: String,
    },

}, {
    timestamps: true
});

const Information = mongoose.model('Information', InformationSchema);

export default Information;