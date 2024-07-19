const mongoose = require('mongoose')

const connectToMongo = async()=>{
    const res = await mongoose.connect("mongodb://localhost:27017/blogDB")
    if(res){
        console.log("Connected to MongoDB Successfully");
    }
};

module.exports = connectToMongo;
