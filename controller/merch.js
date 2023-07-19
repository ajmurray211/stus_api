const Merch = require('../model/merch.js')

const getProducts = async (req, res) => {
    Merch.find({})
        .then(data => res.status(200).json({ data: data, message: 'Here are all of the products you have saved.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem finding the products.' }))
}

const addProduct = async (req, res) => {
    console.log(req.body)
    Merch.create(req.body)
        .then(data => res.status(200).json({ data: data, message: 'Here is the product you have created.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem creating the new product.', err: err }))
}

const editProduct = async (req, res) => {
    Merch.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.status(200).json({ data: data, message: 'Here is the product you have edited.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem Editing.' }))
}

const deleteProduct = async (req, res) => {
    Merch.findByIdAndDelete(req.params.id)
        .then(data => res.status(200).json({ data: data, message: 'Here is the product you have deleted.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem Editing.' }))
}

module.exports = {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct
} 