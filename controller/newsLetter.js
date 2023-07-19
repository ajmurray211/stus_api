const NewsLetter = require('../model/newsLetter.js')

const getEmails = async (req, res) => {
    try {
        NewsLetter.create(req.body)
            .then(res => res.status(400).json({message:'You have added your name to the news letter!'}))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addEmail = async (req, res) => { }

const deleteEmail = async (req, res) => { }

module.exports = { getEmails, addEmail, deleteEmail }