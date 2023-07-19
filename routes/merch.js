const express = require('express')

// controller functions
const { getProducts, addProduct, editProduct, deleteProduct } = require('../controller/merch.js')

const router = express.Router()

router.get('/', getProducts)

router.post('/', addProduct)

router.put('/edit/:id', editProduct)

router.delete('/delete/:id', deleteProduct)

module.exports = router