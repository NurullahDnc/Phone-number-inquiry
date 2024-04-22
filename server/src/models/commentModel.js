import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const commentSchema = new Schema({
    number: {
        type: Schema.Types.ObjectId,
        ref: 'Number',
        required: true,
        
    },

    comment: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['uncertain', 'trustworthy', 'dangerous'],
        default: 'uncertain',
        required: true

    },

}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;