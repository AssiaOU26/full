const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UtilisateurSchema = new mongoose.Schema({
    
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
    
});

UtilisateurSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Utilisateur', UtilisateurSchema);