const express = require('express');
const router = express.Router();


const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
router.post('/', auth, multer, saucesCtrl.createThing);
router.get('/:id',auth, saucesCtrl.getOneThing);
router.put('/:id',auth, multer, saucesCtrl.modifyThing);
router.delete('/:id',auth, saucesCtrl.deleteThing);
router.get('/',auth, saucesCtrl.getAllThings);
router.post('/:id/like', auth, saucesCtrl.voteThings);

module.exports = router;