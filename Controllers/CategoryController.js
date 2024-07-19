const categoryModel = require('../models/catrgory.Model')
class CategoryController{
    static getAllCategory = async(req, res) =>{
        try {
            const fetchAllCategories = await categoryModel.find({});
            res.status(200).json(fetchAllCategories);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };
    static addNewCategory = async(req,res) =>{
        const{title} = req.body;
        try {
            if(title){
                const newCategory = new categoryModel({title});
                const savedcategory =  await newCategory.save();
                // res.status(201).json(newCategory);
                if(savedcategory){
                    res.status(200).send("New category saved successfully")
                }

            }else{
                return res.status(400).json({error: 'Title is required'});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
            
        }
    };
}

module.exports = CategoryController;