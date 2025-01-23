{
  // import { useEffect, useState } from "react";
  // import PropTypes from "prop-types";
  // import { getTaches, deleteTache } from "../api";
  // import { useNavigate } from "react-router-dom";
  // const TacheList = ({ token }) => {
  //   const [taches, setTaches] = useState([]);
  //   const [error, setError] = useState("");
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     const fetchTaches = async () => {
  //       try {
  //         const response = await getTaches(token);
  //         setTaches(response.data);
  //       } catch {
  //         setError("Erreur lors de la récupération des tâches");
  //       }
  //     };
  //     fetchTaches();
  //   }, [token]);
  //   const handleDelete = async (id) => {
  //     try {
  //       await deleteTache(id, token);
  //       setTaches(taches.filter((tache) => tache._id !== id));
  //     } catch {
  //       setError("Erreur lors de la suppression de la tâche");
  //     }
  //   };
  //   return (
  //     <div>
  //       <h2>Liste des tâches</h2>
  //       {error && <p style={{ color: "red" }}>{error}</p>}
  //       <button onClick={() => navigate("/taches/new")}>Ajouter une tâche</button>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Titre</th>
  //             <th>Description</th>
  //             <th>Statut</th>
  //             <th>Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {taches.map((tache) => (
  //             <tr key={tache._id}>
  //               <td>{tache.titre}</td>
  //               <td>{tache.description}</td>
  //               <td>{tache.statut}</td>
  //               <td>
  //                 <button onClick={() => navigate(`/taches/${tache._id}`)}>
  //                   Modifier
  //                 </button>
  //                 <button onClick={() => handleDelete(tache._id)}>
  //                   Supprimer
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };
  // // Ajoutez cette validation des props
  // TacheList.propTypes = {
  //   token: PropTypes.string.isRequired,
  // };
  // export default TacheList;
}

import { useEffect, useState } from "react";
import { getTaches, deleteTache } from "../api";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../CSS/TacheList.css";

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
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Retour
        </button>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
      <h2>Liste des tâches</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {taches.length === 0 && !error && (
        <p>
          Vous n avez aucune tâche pour le moment. Cliquez sur Ajouter une tâche
          pour commencer.
        </p>
      )}
      <button className="btn" onClick={() => navigate("/taches/new")}>
        Ajouter une tâche
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
                  Modifier
                </button>
                <button onClick={() => handleDelete(tache._id)}>
                  Supprimer
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
