const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
       
    }
},{
    timestamps: true, // adds createdAt and updatedAt fields
    versionKey: false, // removes versionKey field
});
const userModel = mongoose.model("Users",userSchema);

module.exports = userModel;