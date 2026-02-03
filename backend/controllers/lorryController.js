const Lorry = require('../models/Lorry');
const logAudit = require('../utils/auditHelper');

exports.createLorry = async (req, res) => {
    try {
        const lorry = new Lorry(req.body);
        await lorry.save();
        await logAudit('CREATE', 'Lorry', lorry._id, req.user ? req.user.id : null, req.body);
        res.status(201).json(lorry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getLorries = async (req, res) => {
    try {
        const lorries = await Lorry.find();
        res.json(lorries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLorry = async (req, res) => {
    try {
        const oldLorry = await Lorry.findById(req.params.id);
        const lorry = await Lorry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await logAudit('UPDATE', 'Lorry', lorry._id, req.user ? req.user.id : null, { old: oldLorry, new: req.body });
        res.json(lorry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteLorry = async (req, res) => {
    try {
        const lorry = await Lorry.findById(req.params.id);
        await Lorry.findByIdAndDelete(req.params.id);
        await logAudit('DELETE', 'Lorry', req.params.id, req.user ? req.user.id : null, lorry);
        res.json({ message: 'Lorry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
