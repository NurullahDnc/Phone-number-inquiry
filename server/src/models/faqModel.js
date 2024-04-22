import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const faqSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
});

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;