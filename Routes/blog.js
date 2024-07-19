const express = require('express');
const controller = require('../Controllers/userController');
const blogController = require('../Controllers/blogsController');
const CategoryController = require('../Controllers/CategoryController');
const userRouter = express.Router();
const multer = require('multer');
const auth = require('../middleware/authmiddeleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()} - ${file.originalname}`);
    },
});
const upload = multer({storage: storage})

userRouter.post("/register",controller.userRegistration);
userRouter.post("/login", controller.userLogin);

userRouter.get("/get/allblogs",auth,blogController.getAllBlogs);
userRouter.post("/post/addblog",upload.single("thumbnail"),auth,blogController.addNewBlogs);
userRouter.get("/get/blog/:id",auth,blogController.getSingleBlog);

userRouter.get("/get/category",auth,CategoryController.getAllCategory);
userRouter.post("/post/addcategory",auth,CategoryController.addNewCategory);



module.exports = userRouter;