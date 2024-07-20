const express = require('express');
const connection = require('./config/db');
const dotenv = require('dotenv');
const userRouter = require('./Routes/blog');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || "mongodb://localhost:27017/blogDB";
app.use(express.static("public/upload"))

app.use(cors());
app.get("/",(req, res) =>{
    res.send("Api Health is working good!");
})

// API Routes
app.use(express.json());
app.use("/user",userRouter);

app.listen(PORT, async() => {
    try {
      await connection();
      console.log(`Server is listening on ${PORT} and Databse is also connected`);
    } catch (error) {
      console.log(error);
      
    }
    
  });