const express = require('express');
const { addProduct, removeProduct, getAllProducts } = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

router.use('/images', express.static('upload/images'));
router.post('/upload', upload.single('product'), (req, res) => {
  res.json({ success: 1, image_url: `http://localhost:8000/images/${req.file.filename}` });
});

router.post('/addproduct', addProduct);
router.post('/removeproduct', removeProduct);
router.get('/allproducts', getAllProducts);

module.exports = router;
