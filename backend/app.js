// importation d'express

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// creation d'application express
const app = express();

mongoose.connect('mongodb+srv://Openclassrooms:Openclassrooms@cluster0.ygeh8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

//middleware

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

//utilisation methode app.use avec fonction qui resoit la requette et la reponse et une fonction next pour renvoyer a la prochaine fonction l'execusion du server
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        id: 'oeihfzeoi',
        title: 'Ma premiere sauce',
        name: 'sauce tomate' ,
        manufacturer: 'amora',
        description: 'Description de la sauce',
        mainPepper: 'tomates',
        imageUrl: 'http://www.lasupersuperette.com/wp-content/uploads/2012/07/IMG_4004REC.jpg',
        heat: 7 ,
        likes: 36 ,
        dislikes: 10 ,
        userId: 'qsomihvqios',
      },
      {
        id: 'ofjfjv',
        title: 'Ma deuxieme sauce',
        name: 'sauce mayonaise' ,
        manufacturer: 'amora',
        description: 'Description de la sauce',
        mainPepper: 'huile',
        imageUrl: 'https://www.carrefour.fr/media/540x540/Photosite/PGC/EPICERIE/8711200552900_PHOTOSITE_20210610_062953_0.jpg?placeholder=1',
        heat: 6 ,
        likes: 20 ,
        dislikes: 40 ,
        userId: 'lksfksf',
      },
    ];
    res.status(200).json(stuff);
  });
// exportation de l'application
module.exports = app;





