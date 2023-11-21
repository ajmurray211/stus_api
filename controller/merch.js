const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const Merch = require('../model/merch.js');
const fs = require('fs');

// Function to get all products
const getProducts = async (req, res) => {
    try {
        const data = await Merch.find({});
        res.status(200).json({ data: data, message: 'Here are all of the products you have saved.' });
    } catch (err) {
        res.status(404).json({ error: 'There was a problem finding the products.' });
    }
}

// get a single product by its id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Merch.findById(id)
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ error: 'There was a problem finding the products.' });
    }
}

// Function to add a new product
const addProduct = async (req, res) => {
    try {
        const data = await Merch.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ error: 'There was a problem creating the new product.', err: err });
    }
};

// Update the Merch object based on the data in req.body
const editProduct = async (req, res) => {
    try {
        const data = Merch.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ error: 'There was a problem Editing the product.' });
    }
};

// Function to delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const data = await Merch.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ error: 'There was a problem deleting the product.' });
    }
};

// Export all the controller functions
module.exports = {
    getProducts,
    addProduct,
    getProductById,
    editProduct,
    deleteProduct
};