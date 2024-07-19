const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    }
},{
    timestamps: false,
    versionKeys:false
});

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;