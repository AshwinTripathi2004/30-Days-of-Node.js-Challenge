import mongoose from 'mongoose';

// Define the schema for the Product entity
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
  
// Create a Mongoose model for the Product entity
const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/db22feb')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));


// Implement CRUD operations.

//Creatte New Product.
async function createProduct(product){
    try{
        const createdProduct = await Product.create(product);
        return createdProduct;
    }catch(error){
        throw new Error(`Error creating product : ${err.message}`);
    }
}

//Retrieve all products.
async function getAllProducts(){
    try{
        const products = await Product.find();
        return products;
    }catch(err){
        throw new Error(`Error retrieving products : ${err.message}`);
    }
}

//Update a product.
async function updateProduct(productId, updatedProduct) {
    try {
      const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
      return product;
    } catch (error) {
      throw new Error('Error updating product: ' + error.message);
    }
}


//Delete product.
async function deleteProduct(prodId){
    try{
        await Product.findByIdAndDelete(prodId);
    }catch(err){
        throw new Error(`Error deleting Product : ${err.message}`);
    }
}



//Test.
// Create a product.
const newProduct1 = await createProduct({ name: 'Product1', price: 10.99, quantity: 100 });
const newProduct2 = await createProduct({ name: 'Product2', price: 64.99, quantity: 10 });
console.log('Created Product: ', newProduct1 + newProduct2);


//Retrieve all products.
const allProducts = await getAllProducts();
console.log('All Products: ', allProducts);


//Update a product.
const product = await Product.findOne({ name : "Product1" });
if(product){
    const prodId = product._id;
    const updatedProduct = await updateProduct(prodId, { price: 1033.33 });
    console.log('Updated Product:', updatedProduct);
}
else{
    console.log("Product not found!");
}


//Delete a product.
const prod = await Product.findOne({name : "Product1"});
if(prod){
    const productId = prod._id;
    await deleteProduct(productId);
    console.log("product Deleted!");
}