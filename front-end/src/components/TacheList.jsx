import { useEffect, useState } from "react";
import { getTaches, deleteTache } from "../api";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../CSS/TacheList.css";
import { FaPencilAlt,FaTrashAlt, FaPlusCircle} from "react-icons/fa";


const TacheList = ({ token, setToken }) => {
  const [taches, setTaches] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaches = async () => {
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
          navigate("/login");
        } else {
          setError("Erreur lors de la récupération des tâches");
        }
      }
    };
    fetchTaches();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteTache(id, token);
      setTaches(taches.filter((tache) => tache._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la tâche :", err);
      setError("Erreur lors de la suppression de la tâche");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <div className="tache-list">
      <div className="action-buttons">
        <button className="btn" onClick={() => navigate("/")}>
          Retour
        </button>
        {/* <button className="btn" onClick={handleLogout}>
          Déconnexion
        </button> */}
      </div>
      <h2>Liste Des Tâches</h2>
      {error && <p style={{ color: "#ff4d4d", textAlign: "center" }}>{error}</p>}
      {taches.length === 0 && !error && (
        <p>
          Vous n'avez aucune tâche pour le moment. Cliquez sur "Ajouter une tâche" pour commencer.
        </p>
      )}
      <button className="btn" onClick={() => navigate("/taches/new")}>
        Ajouter la 1er tâche
      </button>
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
                <button onClick={() => navigate(`/taches/${tache._id}`)}>
                <FaPencilAlt />
                </button>
                <button onClick={() => handleDelete(tache._id)}>
                <FaTrashAlt />
                </button>
                <button onClick={() => navigate("/taches/new")(tache._id)}>
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