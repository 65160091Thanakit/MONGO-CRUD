// models/kpiModel.js
const mongoose = require('mongoose');

const KPISchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['used', 'draft', 'ready'],
        required: true
    }
});

const KPI = mongoose.model('KPI', KPISchema);

module.exports = KPI;
