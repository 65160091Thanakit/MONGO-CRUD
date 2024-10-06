// controllers/kpiController.js
const KPI = require('../models/kpiModel');

// Get all KPIs
exports.getAllKPIs = async (req, res) => {
    try {
        const kpis = await KPI.find();
        res.json(kpis);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Create a new KPI
exports.createKPI = async (req, res) => {
    const { name, status } = req.body;
    try {
        const newKPI = new KPI({ name, status });
        await newKPI.save();
        res.status(201).json(newKPI);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update a KPI
exports.updateKPI = async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    try {
        const updatedKPI = await KPI.findByIdAndUpdate(id, { name, status }, { new: true });
        res.json(updatedKPI);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Delete a KPI
exports.deleteKPI = async (req, res) => {
    const { id } = req.params;
    try {
        await KPI.findByIdAndDelete(id);
        res.json({ message: 'KPI deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};
