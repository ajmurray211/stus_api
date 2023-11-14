const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configure Multer within the router to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    }
});

const upload = multer({ storage: storage });

// Controller functions
const {
    getVariants,
    addVariant,
    editVariant,
    deleteVariant
} = require('../controller/variant.js');

router.get('/', getVariants);
router.post('/', upload.array('productImages', 5), addVariant);
router.put('/:id', upload.array('productImages', 5), editVariant);
router.delete('/delete/:id', deleteVariant);

module.exports = router;