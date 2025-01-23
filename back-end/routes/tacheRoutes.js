const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tacheController');
const auth = require('../middlewares/auth');

router.post('/', auth, tacheController.creerTache);
router.get('/', auth, tacheController.recupererTaches);
router.put('/:id', auth, tacheController.modifierTache);
router.delete('/:id', auth, tacheController.supprimerTache);

module.exports = router;