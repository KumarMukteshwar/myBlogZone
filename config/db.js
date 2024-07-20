const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    const DB = "mongodb+srv://kumarmukteshwar:kumar%40123@cluster0.wh36p0t.mongodb.net/blogDB?retryWrites=true&w=majority";
    await mongoose.connect(DB, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

module.exports = connectToMongo;
