import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const CountrySchema = new Schema({
    name: {
        type: String,
        required: true
    },  
    alpha2Code: {
        type: String,
        required: true
    },
    callingCodes: {
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

const Country = mongoose.model('Country', CountrySchema);

export default Country;