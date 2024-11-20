const Product = require("../modules/product");


// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, image, category, new_price, old_price } = req.body;

    const products = await Product.find({});
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({ id, name, image, category, new_price, old_price });
    await product.save();

    res.json({ success: true, name });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ message: 'Error adding product', error });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await Product.findOneAndDelete({ id });
    res.json({ success: true });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).send({ message: 'Error removing product', error });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: 'Error fetching products', error });
  }
};

module.exports = { addProduct, removeProduct, getAllProducts };
