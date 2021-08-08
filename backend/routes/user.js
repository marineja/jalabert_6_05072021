
const express = require('express');
// importation du module router d'express
const router = express.Router();
// creation du chemin "user" dans controllers
const userCtrl = require('../controllers/user');
// methode post pour signup et login
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;