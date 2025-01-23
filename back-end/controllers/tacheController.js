const Tache = require('../models/tacheModel');

exports.creerTache = async (req, res) => {
    try {
        const tache = new Tache({
            ...req.body,
            utilisateur: req.auth.userId // Associe la tâche à l'utilisateur
        });
        await tache.save();
        res.status(201).json(tache);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.recupererTaches = async (req, res) => {
    try {
        const taches = await Tache.find({ utilisateur: req.auth.userId });
        res.status(200).json(taches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modifierTache = async (req, res) => {
    try {
        const tache = await Tache.findOneAndUpdate(
            { _id: req.params.id, utilisateur: req.auth.userId },
            { ...req.body },
            { new: true }
        );
        if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
        res.status(200).json(tache);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.supprimerTache = async (req, res) => {
    try {
        const tache = await Tache.findOneAndDelete({
            _id: req.params.id,
            utilisateur: req.auth.userId
        });
        if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
        res.status(200).json({ message: 'Tâche supprimée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};