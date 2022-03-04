
# P6-PIIQUANTE - Construisez une API sécurisée pour une application d'avis gastronomiques

<p align="center">
  <img src="https://www.jmax.dev/images/16275605596354_PiiquanteLogo.png">
</p>


## Repository GitHub
Retirez le code de l'application front-end du repository du projet et suivez les
étapes suivantes :
1. Clonez le repository
2. Ouvrez un terminal (Linux/Mac) ou une invite de commande/PowerShell
(Windows)
3. Exécutez npm install à partir du répertoire du projet
4. Exécutez npm start
5. Exécutez le back-end sur http://localhost:3000 seulement
Si vous utilisez VSCode, utilisez l'extension LiveShare pour faire fonctionner le
serveur front-end sans avoir recours à npm install

### Routes api (exemples)

#### création de l'article:

router.post('/', auth, multer, stuffCtrl.createSauce);

#### retourne la page de modification de l'article avec Id correspondant:

router.put('/:id', auth, multer, stuffCtrl.modifySauce);

#### Suppression de l'article avec Id correspondant:

router.delete('/:id', auth, stuffCtrl.deleteSauce);

#### retourne le visuel l'article créé avec son Id correspondant:

router.get('/:id', auth, stuffCtrl.getOneSauce);

#### Visuel de l'ensemble des articles créés:

router.get('/', auth, stuffCtrl.getAllSauce);

#### Gère l'ensemble les likes et dislikes des sauces:

router.post('/:id/like', auth, stuffCtrl.likeManager);


<p align="center">
  <img src="http://panzer4fragers.doomby.com/medias/images/requirements-dw-p6-page-0004.jpg" alt=""/>
</p>

