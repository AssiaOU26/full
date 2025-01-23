import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Fonction pour enregistrer un utilisateur
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { email, password });
    return response;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};

// Fonction pour connecter un utilisateur
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

// Fonction pour récupérer les tâches
export const getTaches = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/taches`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    throw error;
  }
};

// Fonction pour créer une tâche
export const createTache = async (tache, token) => {
  try {
    const response = await axios.post(`${API_URL}/taches`, tache, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de la tâche :", error);
    throw error;
  }
};

// Fonction pour mettre à jour une tâche
export const updateTache = async (id, tache, token) => {
  try {
    const response = await axios.put(`${API_URL}/taches/${id}`, tache, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    throw error;
  }
};

// Fonction pour supprimer une tâche
export const deleteTache = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/taches/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
    throw error;
  }
};