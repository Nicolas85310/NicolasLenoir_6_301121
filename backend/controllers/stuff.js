const Sauce = require('../models/Sauce');
const fs = require('fs');

//création d'une sauce (texte et image)
exports.createSauce = (req, res, next) => {
  const sauceObjet = JSON.parse(req.body.sauce);
  delete sauceObjet._id;
  const sauce = new Sauce({
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()//sauvegarde de l'article dans la Bd 
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};
//Modification d'un ou plusieurs éléments d'une sauce choisie (texte et/ou image)
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      if (!sauce) {
        res.status(404).json({
          error: new Error('No such sauce!')
        });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }

      const Filename = sauce.imageUrl.split('/images/')[1];

      //fonction pour remplacer l'image
      const sauceObject = req.file ?
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));

      //fonction pour supprimer l'image
      if (req.file) {
        fs.unlinkSync(`images/${Filename}`);
      }
    });
};

//Suppression d'une sauce et de son contenu(texte et image)
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      if (!sauce) {
        res.status(404).json({
          error: new Error('No such sauce!')
        });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
      )
    })
};
//Appel d'une sauce particulière (choisie)
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};
//Appel de l'ensemble des sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


//Gestionnaire des likes et dislikes...
exports.likeManager = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id

  //Ajout d'un like
  if (like === 1) {
    Sauce.updateOne({ _id: sauceId },
      {
        $push: { usersLiked: userId },
        $inc: { likes: 1 },
      })

      .then(() => res.status(200).json({ message: ' Vous avez aimé cette sauce :) !' }))
      .catch(error => { console.log(error); res.status(400).json({ error }) })
  }

  //Ajout d'un dislike
  if (like === -1) {
    Sauce.updateOne({ _id: sauceId },
      {
        $push: { usersDisliked: userId },
        $inc: { dislikes: 1 },
      })


      .then(() => res.status(200).json({ message: 'Cette sauce n est pas à votre goût :( !' }))
      .catch(error => { console.log(error); res.status(400).json({ error }) })
  }


  //Annuler un like ou un dislike
  if (like === 0) {
    Sauce.findOne({ _id: sauceId })

      //Annule le like suivant l'userId
      .then(sauce => {
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne({ _id: sauceId },
            {
              $pull: { usersLiked: userId },
              $inc: { likes: -1 },
            })
            .then(() => res.status(200).json({ message: 'Vous avez retiré votre like !' }))
            .catch(error => { console.log(error); res.status(400).json({ error }) })
        }

        //Annule le dislike suivant l'userId
        else if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne({ _id: sauceId },
            {
              $pull: { usersDisliked: userId },
              $inc: { dislikes: -1 },
            })
            .then(() => res.status(200).json({ message: 'Vous avez retiré votre dislike !' }))
            .catch(error => { console.log(error); res.status(400).json({ error }) })
        }
      })
  }
  

}//Fin du likeManager

