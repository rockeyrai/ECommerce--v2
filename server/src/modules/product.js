const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
