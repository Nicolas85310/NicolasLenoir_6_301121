const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//création de l'article
router.use(express.json());
router.post('/', auth, multer, stuffCtrl.createThing);

//retourne la page de modification de l'article avec Id correspondant
router.put('/:id', auth, multer, stuffCtrl.modifyThing);

//Suppression de l'article avec Id correspondant
router.delete('/:id', auth, stuffCtrl.deleteThing);

//retourne le visuel l'article créé avec son Id correspondant
router.get('/:id', auth, stuffCtrl.getOneThing);

//Visuel de l'ensemble des articles créés
router.get('/', auth, stuffCtrl.getAllThing);

module.exports = router;