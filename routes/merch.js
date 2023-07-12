const express = require('express')

// controller functions
const { getProducts, addProduct, editProduct, deleteProduct } = require('../controller/merch.js')

const router = express.Router()

// get the products
router.get('/', getProducts)

// login route
router.post('/add', addProduct)

// edit user information
router.put('/edit/:id', editProduct)

router.delete('/delete/:id', deleteProduct)

module.exports = router