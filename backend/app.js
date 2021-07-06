// importation d'express

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces');

const userRoutes = require('./routes/user');

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

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// exportation de l'application
module.exports = app;





