const express = require('express');

const router = express.Router();

const registerRoutes = require('../features/register/routes');
const loginRoutes = require('../features/login/routes');
const logoutRoutes = require('../features/logout/routes');
const profileRoutes = require('../features/profile/routes');
const uploadRoutes = require('../features/upload/routes');
const mailingRoutes = require('../features/SendMail/routes');
const mailConfigRoutes = require('../features/configMail/routes');

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.json({ success: false });
}

router.get('/get-session', (req, res) => {
  if (req.user && req.isAuthenticated()) {
    return res.json({ success: true, userInfo: req.user });
  }

  return res.json({ success: false });
});

router.use('/login', loginRoutes);
router.use('/config',mailConfigRoutes);
router.use('/uploadcsv',uploadRoutes);
router.use('/sendmail',mailingRoutes);
router.use('/profile', isAuthenticated, profileRoutes);
router.use('/logout', isAuthenticated, logoutRoutes);
router.use('/register', registerRoutes);

module.exports = router;
