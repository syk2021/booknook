import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
    postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    authorId: { type: mongoose.Types.ObjectId, ref: 'User'},
    body: { type: String, required: [true, 'text is required!']},
    createdAt: { type: Date, default: Date.now },
    clickedEdit: { type: Boolean, default: false },
    updatedAt: { type: Date },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;