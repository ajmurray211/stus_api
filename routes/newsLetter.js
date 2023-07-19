const express = require('express')

const { getEmails, addEmail, deleteEmail } = require('../controller/newsLetter.js')

const router = express.Router()


router.get('/', getEmails)

router.post('/signUp', addEmail)

router.delete('/delete', deleteEmail)

module.exports = router