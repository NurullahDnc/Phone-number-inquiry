import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const CountrySchema = new Schema({
    country: {
        type: String,
        required: true
    },
    code: {
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