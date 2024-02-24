import mongoose from "mongoose";

//Define Category Schema.
const categorySchema = new mongoose.Schema({
    name : String,
    description : String
});


//Define Product Schema with reference to Category.
const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    }
});


//Define Category Model.
const Category = mongoose.model('Category', categorySchema);

//Define Product Model.
const Product = mongoose.model('Product', productSchema);


// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1/db23feb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));



async function getProductsPopulateWithCategory(){
    try{
        const products = await Product.find().populate('category').exec();
        return products;
    }catch(err){
        console.log(`Error fetching products : ${err}`);
        return [];
    }
}


//Creating a Category.
const newCategory = new Category({
    name : 'Books',
    description : 'Products related to Books.'
});
await newCategory.save();


//Creating a Product associated to the category.
const newProduct = new Product({
    name : 'Novel',
    description : 'A powerful Novel for an awesome read.',
    price : 1000,
    category : newCategory._id
});
await newProduct.save();


//Retrieving products with populated category details.
const productsWithCategory = await getProductsPopulateWithCategory();
console.log(productsWithCategory);