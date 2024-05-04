

import mongoose from 'mongoose';

const {
    Schema
} = mongoose;


const SocialSchema = new mongoose.Schema({

     facebook: {
        type: String,
        required: true
    },

    instagram: {
        type: String,
        required: true
    },

    twitter: {
        type: String,
        required: true
    },
    
    linkedin: {
        type: String,
        required: true
    },

  
}, {
    timestamps: true
});

const Social = mongoose.model('Social', SocialSchema);

export default Social;