const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tacheRoutes = require('./routes/tacheRoutes');
const usersRoute = require('./routes/usersRoute');

// Créer l'application Express
const app = express();

// Middlewares
app.use(cors()); // Autorise les requêtes cross-origin
app.use(express.json()); // Permet de parser les requêtes JSON

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/GestionTaches')
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Routes
app.use('/api/taches', tacheRoutes); // Routes pour les tâches
app.use('/api/auth', usersRoute); // Routes pour l'authentification

// Exporter l'application pour une utilisation dans server.js
module.exports = app;