const mongoose = require('mongoose');

const { Schema } = mongoose;

const FeaturePresentationSchema = new Schema({
  title1: {
    type: String,
    required: true
  },
  title2: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

const FeaturePresentation = mongoose.model('FeaturePresentation', FeaturePresentationSchema);

module.exports = FeaturePresentation;
