const mongoose = require('mongoose');

blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    category: {
        type: String,
        required: true,
        // unique: true,
    },
    numViews: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisliked: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/922745190/photo/blogging-blog-concepts-ideas-with-worktable.jpg?s=1024x1024&w=is&k=20&c=47-y8UPbITvHDInivDBKJJiTMzO6Ds78N2UHQUjQZqk="
    },
    author: {
        type: String,
        deafult: "admin"
    },
},
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true
    },
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);