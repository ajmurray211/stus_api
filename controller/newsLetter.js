const NewsLetter = require('../model/newsLetter.js')

const getEmails = async (req, res) => {
    try {
        const data = await NewsLetter.find({});
        res.status(200).json({ data: data, message: 'Here are all of the emails you have stored.' });
    } catch (err) {
        res.status(404).json({ error: 'There was a problem finding the products.' });
    }
}

const addEmail = async (req, res) => {
    try {
        const data = await NewsLetter.create(req.body)
        res => res.status(400).json({ data: data, message: 'You have added your name to the news letter!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteEmail = async (req, res) => {
    try {
        NewsLetter.delete(req.body.id)
            .then(res => res.status(400).json({ message: 'You have unsubscibed from Stus news letter!' }))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getEmails, addEmail, deleteEmail }