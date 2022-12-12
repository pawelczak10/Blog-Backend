const express = require('express');
const routesController = require('../controllers/routes-controllers');

const router = express.Router();


router.post('/api/routes', routesController.addRoute)

module.exports = router;
