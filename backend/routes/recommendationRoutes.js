const express = require('express');
const router = express.Router();

const { getRecommendation } = require('../controllers/recommendationsController');

router.get('/recommendations/:username', getRecommendation);

module.exports = router;
