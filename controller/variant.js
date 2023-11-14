const Variant = require('../model/variant.js')
const cleanupUnusedImages = require('../utils/cleanUploadsFOlder.js')

const getVariants = async (req, res) => {
    Variant.find({})
        .then(data => res.status(200).json({ data: data, message: 'Here are all of the Variants you have saved.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem finding the Variants.' }))
}

const addVariant = async (req, res) => {
    console.log(req.body)
    Variant.create(req.body)
        .then(data => res.status(200).json({ data: data, message: 'Here is the Variant you have created.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem creating the new Variant.', err: err }))
}

const editVariant = async (req, res) => {
    console.log('hit edit variant in variant', req)

    Variant.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.status(200).json({ data: data, message: 'Here is the Variant you have edited.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem Editing.' }))
}

const deleteVariant = async (req, res) => {
    Variant.findByIdAndDelete(req.params.id)
        .then(data => res.status(200).json({ data: data, message: 'Here is the Variant you have deleted.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem deleting.' }))
}

module.exports = {
    getVariants,
    addVariant,
    editVariant,
    deleteVariant
} 