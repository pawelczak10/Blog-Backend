const express = require('express');
const routesController = require('./routes-controllers');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);
router.post('/', routesController.addRoute)

module.exports = router;