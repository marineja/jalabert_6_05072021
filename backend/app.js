// importation d'express

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

//pour avoir acces au chemin du systeme de ficher (pour les images)
const path = require('path');

//parametre des routes things
const saucesRoutes = require('./routes/sauces');

const userRoutes = require('./routes/user');

//paramètre pour renforcer l'authentification de l'utilisateur
const auth = require('./routes/user');



// creation d'application express
const app = express();

//connexion à MongoDB
mongoose.connect('mongodb+srv://Openclassrooms:Openclassrooms@cluster0.ygeh8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// CORS configuration de l'adresse
app.use(cors({
  origin: 'http://localhost:4200'
}));
//configuration des entêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

//gestion des routes principales
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// exportation de l'application
module.exports = app;





