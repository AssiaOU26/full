const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Le titre est obligatoire'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    statut: {
        type: String,
        enum: ['À faire', 'En cours', 'Terminé'],
        default: 'À faire'
    },
    dateEcheance: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    utilisateur: { // Champ ajouté
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    }
});

module.exports = mongoose.model('Tache', TacheSchema);