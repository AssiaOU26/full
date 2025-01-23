const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/usersModel');

// Fonction pour générer un token JWT
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'VOTRE_CLE_SECRETE_JWT', // Utilisez une variable d'environnement pour la clé secrète
        { expiresIn: '24h' }
    );
};

// signup d'un nouvel utilisateur
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis' });
        }

        const utilisateurExistant = await Utilisateur.findOne({ email });
        if (utilisateurExistant) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const hash = await bcrypt.hash(password, 10);
        const utilisateur = new Utilisateur({ email, password: hash });
        await utilisateur.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
};

// login d'un utilisateur
exports.login = async (req, res) => {
    try {
        // Validation des entrées
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis' });
        }

        // Trouver l'utilisateur par email
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const valide = await bcrypt.compare(password, utilisateur.password);
        if (!valide) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = generateToken(utilisateur._id);

        // Réponse réussie
        res.status(200).json({
            userId: utilisateur._id,
            token
        });
    } catch (error) {
        console.error('Erreur lors de la login :', error);
        res.status(500).json({ message: 'Erreur lors de la login' });
    }
};
// *************************************************************************************

