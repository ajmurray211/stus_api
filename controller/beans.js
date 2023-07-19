const Bean = require('../model/bean.js')

const getBeans = async (req, res) => {
    Bean.find({})
        .then(data => res.status(200).json({ data: data, message: 'Here are all of the Beans you have saved.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem finding the Beans.' }))
}

const addBean = async (req, res) => {
    console.log(req.body)
    Bean.create(req.body)
        .then(data => res.status(200).json({ data: data, message: 'Here is the Bean you have created.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem creating the new Bean.', err: err }))
}

const editBean = async (req, res) => {
    Bean.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.status(200).json({ data: data, message: 'Here is the Bean you have edited.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem Editing.' }))
}

const deleteBean = async (req, res) => {
    Bean.findByIdAndDelete(req.params.id)
        .then(data => res.status(200).json({ data: data, message: 'Here is the Bean you have deleted.' }))
        .catch(err => res.status(404).json({ error: 'There was a problem Editing.' }))
}

module.exports = {
    getBeans,
    addBean,
    editBean,
    deleteBean
} 