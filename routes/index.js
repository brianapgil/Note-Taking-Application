const router = require('express').Router();

// Import our modular routers for /apiRoutes and /htmlroutes
const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;
