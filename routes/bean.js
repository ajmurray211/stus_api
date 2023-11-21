const express = require('express')

// controller functions
const { getBeans, addBean, getBeanById, editBean, deleteBean } = require('../controller/beans.js')

const router = express.Router()

router.get('/', getBeans)

router.post('/', addBean)

router.get('/:id', getBeanById)

router.put('/edit/:id', editBean)

router.delete('/delete/:id', deleteBean)

module.exports = router