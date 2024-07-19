const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

const blogModel = mongoose.model("Blogs",blogSchema);
module.exports = blogModel;