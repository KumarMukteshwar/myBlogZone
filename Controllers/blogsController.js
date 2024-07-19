const blogModel = require('../models/blog.Model');
class BlogController{
    static getAllBlogs = async(req,res)=>{
       try {
        const fetchAllBlogs = await blogModel.find({user: req.user._id})
        res.status(200).json(fetchAllBlogs);
       } catch (error) {
        res.status(404).send(error.message)
       }
    };
    static addNewBlogs = async(req,res)=>{
        const {title,category,description} = req.body;
        try {
            if(title && category && description){
                const addBlog = new blogModel({title: title, description:description, category: category,thumbnail:req.file.filename,user:req.user._id});
                await addBlog.save();
                res.status(201).send({"msg":"Blog added successfully"})
            }else{
                return res.status(400).send("All fields are required");
            }
        } catch (error) {
            
        } 
    };
    static getSingleBlog = async(req,res)=>{
        const { id } = req.params
        try {
            if(id){
                const fetchBlogById = await blogModel.findById(id);
                if(fetchBlogById){
                    res.status(200).json(fetchBlogById);
                }else{
                    return res.status(404).send("Blog not found");
                }
            }else{
                return res.status(400).send("Invalid blog id");
            }
            
        } catch (error) {
            res.status(404).json({ message: error.message})
        }
       
    };
}

module.exports = BlogController;