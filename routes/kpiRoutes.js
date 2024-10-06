// routes/kpiRoutes.js
const express = require('express');
const router = express.Router();
const kpiController = require('../controllers/kpiController');

// Define CRUD routes
router.get('/kpis', kpiController.getAllKPIs);
router.post('/kpis', kpiController.createKPI);
router.put('/kpis/:id', kpiController.updateKPI);
router.delete('/kpis/:id', kpiController.deleteKPI);

module.exports = router;
