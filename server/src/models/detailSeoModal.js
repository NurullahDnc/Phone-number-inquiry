import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const detailSeoSchema = new Schema({
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

const DetailSeo = mongoose.model('DetailSeo', detailSeoSchema);

export default DetailSeo;

