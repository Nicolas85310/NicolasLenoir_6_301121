const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//création de l'article
router.use(express.json());
router.post('/', auth, multer, stuffCtrl.createSauce);

//retourne la page de modification de l'article avec Id correspondant
router.put('/:id', auth, multer, stuffCtrl.modifySauce);

//Suppression de l'article avec Id correspondant
router.delete('/:id', auth, stuffCtrl.deleteSauce);

//retourne le visuel l'article créé avec son Id correspondant
router.get('/:id', auth, stuffCtrl.getOneSauce);

//Visuel de l'ensemble des articles créés
router.get('/', auth, stuffCtrl.getAllSauce);

//Gère l'ensemble les likes et dislikes des sauces
router.post('/:id/like', auth, stuffCtrl.likeManager)

module.exports = router;
