const express = require('express');
const router = express.Router();
const bakedGoodController = require('../controller/bakedGoods');

// Routes
router.get('/', bakedGoodController.getAllBakedGoods);
router.get('/:id', bakedGoodController.getBakedGoodById);
router.post('/', bakedGoodController.createBakedGood);
router.put('/:id', bakedGoodController.updateBakedGood);
router.delete('/:id', bakedGoodController.deleteBakedGood);

module.exports = router;
