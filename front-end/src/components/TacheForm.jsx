// import { useState, useEffect } from "react";
// import PropTypes from "prop-types"; // Ajoutez cette ligne
// import { createTache, updateTache, getTaches } from "../api";
// import { useNavigate, useParams } from "react-router-dom";

// const TacheForm = ({ token }) => {
//   const [titre, setTitre] = useState("");
//   const [description, setDescription] = useState("");
//   const [statut, setStatut] = useState("À faire");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       const fetchTache = async () => {
//         try {
//           const response = await getTaches(token);
//           const tache = response.data.find((t) => t._id === id);
//           if (tache) {
//             setTitre(tache.titre);
//             setDescription(tache.description);
//             setStatut(tache.statut);
//           }
//         } catch {
//           setError("Erreur lors de la récupération de la tâche");
//         }
//       };
//       fetchTache();
//     }
//   }, [id, token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const tache = { titre, description, statut };
//     try {
//       if (id) {
//         await updateTache(id, tache, token);
//       } else {
//         await createTache(tache, token);
//       }
//       navigate("/taches");
//     } catch {
//       setError("Erreur lors de la sauvegarde de la tâche");
//     }
//   };

//   return (
//     <div>
//       <h2>{id ? "Modifier la tâche" : "Ajouter une tâche"}</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Titre:</label>
//           <input
//             type="text"
//             value={titre}
//             onChange={(e) => setTitre(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Statut:</label>
//           <select value={statut} onChange={(e) => setStatut(e.target.value)}>
//             <option value="À faire">À faire</option>
//             <option value="En cours">En cours</option>
//             <option value="Terminé">Terminé</option>
//           </select>
//         </div>
//         <button type="submit">{id ? "Modifier" : "Ajouter"}</button>
//       </form>
//     </div>
//   );
// };

// // Ajoutez cette validation des props
// TacheForm.propTypes = {
//   token: PropTypes.string.isRequired,
// };

// export default TacheForm;

import { useState, useEffect } from "react";
import { createTache, updateTache, getTaches } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "../CSS/TacheForm.css";

const TacheForm = ({ token }) => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState("À faire");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTache = async () => {
        try {
          const response = await getTaches(token);
          const tache = response.data.find((t) => t._id === id);
          if (tache) {
            setTitre(tache.titre);
            setDescription(tache.description);
            setStatut(tache.statut);
          }
        } catch (err) {
          console.error("Erreur lors de la récupération de la tâche :", err);
          setError("Erreur lors de la récupération de la tâche");
        }
      };
      fetchTache();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tache = { titre, description, statut };
    try {
      if (id) {
        await updateTache(id, tache, token);
      } else {
        await createTache(tache, token);
      }
      navigate("/taches");
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de la tâche :", err);
      setError("Erreur lors de la sauvegarde de la tâche");
    }
  };

  return (
    <div>
      <h2>{id ? "Modifier la tâche" : "Ajouter une tâche"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Statut:</label>
          <select value={statut} onChange={(e) => setStatut(e.target.value)}>
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>
        <button type="submit">{id ? "Modifier" : "Ajouter"}</button>
      </form>
    </div>
  );
};

TacheForm.propTypes = {
  token: PropTypes.string.isRequired,
};

export default TacheForm;
