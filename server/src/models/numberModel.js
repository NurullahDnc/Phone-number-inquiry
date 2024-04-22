import mongoose from "mongoose";

const {
    Schema
} = mongoose;

const phoneNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true
  },
  countryCode:{
    type: String,
    // required: true
  },
  countryName:{
    type: String,
    // required: true

  },


});


const phoneNumber= mongoose.model('Number', phoneNumberSchema);

export default phoneNumber;
 