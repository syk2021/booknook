import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String], // string array
    publishedDate: {
        type: Date,
        default: Date.now, // default value is date now
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

// make model instance (Param 1: schema 1's name, Param 2: schema object)
const Post = mongoose.model('Post', PostSchema);

// export
export default Post;