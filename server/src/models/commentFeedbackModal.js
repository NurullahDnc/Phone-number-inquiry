import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const commentFeedbackSchema = new Schema({
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    number: {
        type: Schema.Types.ObjectId,
        ref: 'Number',
     },
    surname: {
        type: String,
        required: true
    },

    mail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const CommentFeedback = mongoose.model('CommentFeedback', commentFeedbackSchema);

export default CommentFeedback;