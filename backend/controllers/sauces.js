const Thing = require('../models/Thing');
const fs = require('fs');



// pour creer une sauce

exports.createThing = (req, res, next) => {
  console.log("1");
  const thingObject = JSON.parse(req.body.sauce);
  console.log("2");
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

// modifier une sauce
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//suprimer une sauce
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


  exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id})
    .then(things => res.status(200).json(things))
    .catch(error => res.status(404).json({ error }));
  };

  // recuperer toutes les sauces
  exports.getAllThings = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};



 //  like
 exports.voteThings = (req, res, next) => {
    const vote = req.body.like;
    switch(vote){
          // si l'utilisateur aime :  ajout de son id au tableau et incrémentation des likes
          case 1 :
              Thing.updateOne({_id : req.params.id}, {$inc : {likes : +1 },
              $push : { usersLiked : req.body.userId}
            })
                .then(() => res.status(200).json({message : "un j'aime est ajouté"}))
                .catch(error => res.status(500).json({error}))       
          break;

          // si 'utilisateur n'aime pas :ajout de son id au tableau et  incrémentation des likes
          case -1 :
            Thing.updateOne({_id : req.params.id}, {
              $push : { usersDisliked : req.body.userId}, $inc : {dislikes : +1 }
            })
                .then(() => res.status(201).json({message : "un je n'aime pas est ajouté"}))
                .catch(error => res.status(500).json({ error }))
          break;

          //l'utilisateur suprime sont like ou je n'aime pas  : il est retiré  du tableau et  désincrémentation  des jaime et jaime pas d'apres son tableau
          case 0 :  
            Thing.findOne({_id : req.params.id})
                .then(thing => {
                    if (thing.usersLiked.includes(req.body.userId)){
                      thing.updateOne({_id : req.params.id}, {
                        $pull : { usersLiked : req.body.userId}, $inc : {likes : -1 }
                      })
                        .then(() => res.status(201).json({message : "j'aime est retiré !"}))
                        .catch(error => res.status(500).json({error}))
                    }
                    else{
                      Thing.updateOne({_id : req.params.id}, {
                        $pull : { usersDisliked : req.body.userId}, $inc : {dislikes : -1 }
                      })
                        .then(() => res.status(201).json({message : "je n'aime pas est retiré !"}))
                        .catch(error => res.status(500).json({ error }))
                    }

                }) 
                .catch(error => res.status(500).json({ error}))
          break;  
            
          default : console.log(req.body)
      }
    
}