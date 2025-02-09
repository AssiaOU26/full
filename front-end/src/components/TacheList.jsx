import { useEffect, useState } from "react";
import { getTaches, deleteTache } from "../api";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../CSS/TacheList.css";
import { FaPencilAlt, FaTrashAlt, FaPlusCircle } from "react-icons/fa";

const TacheList = ({ token, setToken }) => {
  const [taches, setTaches] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Récupérer les tâches au chargement du composant
  const fetchTaches = async () => {
    if (!token) {
      setError("Vous devez être connecté pour accéder à cette page.");
      navigate("/login");
      return;
    }

    try {
      const response = await getTaches(token);
      if (response.data.length === 0) {
        setTaches([]);
        setError("");
      } else {
        setTaches(response.data);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des tâches :", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login", { replace: true });
      } else {
        setError("Erreur lors de la récupération des tâches");
      }
    }
  };

  useEffect(() => {
    fetchTaches();
  }, [token, navigate, setToken]);

  // Gérer la suppression d'une tâche
  const handleDelete = async (id) => {
    try {
      // Afficher un message dans la console pour confirmer la suppression
      console.log(`Tentative de suppression de la tâche avec l'ID : ${id}`);

      // Appel API pour supprimer la tâche
      await deleteTache(id, token);

      // Mettre à jour l'état en filtrant la tâche supprimée
      setTaches((prevTaches) => prevTaches.filter((tache) => tache._id !== id));

      // Confirmation réussie dans la console
      console.log(`La tâche avec l'ID ${id} a été supprimée avec succès.`);
    } catch (err) {
      // Gérer les erreurs
      console.error("Erreur lors de la suppression de la tâche :", err);
      setError("Erreur lors de la suppression de la tâche");
    }
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login", { replace: true });
  };

  return (
    <div className="tache-list">
      {/* Barre d'action avec le bouton Déconnexion */}
      <div className="action-buttons">
        <button className="btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      {/* Titre de la liste des tâches */}
      <h2>Liste Des Tâches</h2>

      {/* Afficher les messages d'erreur si nécessaire */}
      {error && (
        <p style={{ color: "#ff4d4d", textAlign: "center" }}>{error}</p>
      )}

      {/* Message si aucune tâche n'est présente */}
      {taches.length === 0 && !error && (
        <p>
          Vous n'avez aucune tâche pour le moment. Cliquez sur "Ajouter une
          tâche" pour commencer.
        </p>
      )}

      {/* Bouton pour ajouter une nouvelle tâche */}
      <button className="btn" onClick={() => navigate("/taches/new")}>
        Ajouter une tâche
      </button>

      {/* Tableau affichant les tâches */}
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taches.map((tache) => (
            <tr key={tache._id}>
              <td>{tache.titre}</td>
              <td>{tache.description}</td>
              <td>{tache.statut}</td>
              <td>
                {/* Bouton pour modifier une tâche */}
                <button onClick={() => navigate(`/taches/${tache._id}`)}>
                  <FaPencilAlt />
                </button>
                {/* Bouton pour supprimer une tâche */}
                <button onClick={() => handleDelete(tache._id)}>
                  <FaTrashAlt />
                </button>
                {/* Bouton pour ajouter une nouvelle tâche (inutile ici ?) */}
                <button onClick={() => navigate("/taches/new")}>
                  <FaPlusCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TacheList.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default TacheList;
