const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const Merch = require('../model/merch.js');
const fs = require('fs');
const cleanupUnusedImages = require('../utils/cleanUploadsFOlder.js');
const { addVariant, editVariant } = require('../controller/variant.js');
const Variant = require('../model/variant.js')

// Function to get all products
const getProducts = async (req, res) => {
    try {
        const data = await Merch.find({}).populate('variants');
        res.status(200).json({ data: data, message: 'Here are all of the products you have saved.' });
    } catch (err) {
        res.status(404).json({ error: 'There was a problem finding the products.' });
    }
};

// Function to add a new product
const addProduct = async (req, res) => {
    cleanupUnusedImages()
    try {
        const data = await Merch.create(req.body);
        res.status(200).json({ data: data, message: 'Here is the product you have created.' });
    } catch (err) {
        res.status(404).json({ error: 'There was a problem creating the new product.', err: err });
    }
};

const editProduct = async (req, res) => {

    // update the varients data 
    if (req.body.variants) {
        for (const variant of req.body.variants) {
            let updatedVariant = await Variant.findByIdAndUpdate(variant._id, variant, { new: true });
        }
    }

    let variantToBeUpdated = await Variant.findById(req.body.id)
    let merchBeingUpdated = await Merch.findById(req.params.id)

    // update the variants images
    if (req.files) {
        if (merchBeingUpdated.variants.includes(variantToBeUpdated._id)) {
            console.log(req.files[0].filename)
            variantToBeUpdated.productImages.push(`${req.files[0].filename}`);
            await variantToBeUpdated.save();

            cleanupUnusedImages();
        } else {
            console.log('new id'); 
        }
    }

    // Update the Merch object based on the data in req.body
    Merch.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.status(200).json({ data: data, message: 'Here is the Bean you have edited.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem Editing.' }));
};

// Function to delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const data = await Merch.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: data, message: 'Here is the product you have deleted.' });
    } catch (err) {
        res.status(404).json({ error: 'There was a problem deleting the product.' });
    }
};

// Export all the controller functions
module.exports = {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct
};