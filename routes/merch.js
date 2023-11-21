const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Merch = require('../model/merch.js');

// Configure Multer within the router to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        const fileExtension = path.extname(file.originalname);
        console.log('multer', file)
        cb(null, uniqueSuffix + fileExtension);

    }
});

const upload = multer({ storage: storage });

// Controller functions
const { getProducts, addProduct, getProductById, editProduct, deleteProduct } = require('../controller/merch.js');

router.get('/', getProducts);
router.post('/', upload.array('productImages', 5), addProduct);
router.get('/:id', getProductById);
router.put('/:id', upload.array('productImages', 5), editProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;