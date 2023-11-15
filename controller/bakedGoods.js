const BakedGood = require('../model/bakedGood.js');

const getAllBakedGoods = async (req, res) => {
    try {
        const bakedGoods = await BakedGood.find();
        res.json(bakedGoods);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getBakedGoodById = async (req, res) => {
    try {
        const bakedGood = await BakedGood.findById(req.params.id);
        if (!bakedGood) {
            return res.status(404).json({ error: 'BakedGood not found' });
        }
        res.json(bakedGood);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createBakedGood = async (req, res) => {
    try {
        const bakedGood = new BakedGood(req.body);
        await bakedGood.save();
        res.status(201).json(bakedGood);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateBakedGood = async (req, res) => {
    try {
        const bakedGood = await BakedGood.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!bakedGood) {
            return res.status(404).json({ error: 'BakedGood not found' });
        }
        res.json(bakedGood);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteBakedGood = async (req, res) => {
    try {
        const bakedGood = await BakedGood.findByIdAndDelete(req.params.id);
        if (!bakedGood) {
            return res.status(404).json({ error: 'BakedGood not found' });
        }
        res.json(bakedGood);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllBakedGoods,
    getBakedGoodById,
    createBakedGood,
    updateBakedGood,
    deleteBakedGood
};
