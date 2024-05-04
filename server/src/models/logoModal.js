import mongoose from 'mongoose'

const {
    Schema
} = mongoose;



const LogoSchema = new Schema({

    image: {
        type: String,
     },
    logo: {
        type: String,
        required: true,
     },
     description: {
        type: String,
        required: true,
     },
     keywords: {
        type: String,
        required: true,
     },
    image_id: {
        type: String,
      },

}, {
    timestamps: true,

});


const Logo = mongoose.model('Logo', LogoSchema);

export default Logo;

