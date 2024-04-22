import mongoose from 'mongoose';

const {
    Schema
} = mongoose;


const PrivacyPolicySchema = new mongoose.Schema({

    //gizlilik Bildirimi
    privacyStatement: {
        type: String,
        required: true
    },

    //veri Erişimi
    dataAccess: {
        type: String,
        required: true
    },

    //veri koruması
    dataProtection: {
        type: String,
        required: true
    },
    
    //iletisim
    contact: {
        type: String,
        required: true
    },

    //Son güncelleme
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', PrivacyPolicySchema);

export default PrivacyPolicy;