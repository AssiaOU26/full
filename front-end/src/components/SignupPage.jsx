// import { useState } from "react";
// import PropTypes from "prop-types"; // Ajoutez cette ligne
// import { signup } from "../api";
// import { useNavigate } from "react-router-dom";

// const SignupPage = ({ setToken }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await signup(email, password); // Assurez-vous que email et password sont définis
//       setToken(response.data.token);
//       localStorage.setItem("token", response.data.token);
//       navigate("/taches");
//     } catch (err) {
//       console.error("Erreur lors de l'inscription :", err); // Affichez l'erreur dans la console
//       setError("Erreur lors de l'inscription");
//     }
//   };

//   return (
//     <div>
//       <h2>Inscription</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Mot de passe:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">S inscrire</button>
//       </form>
//       <p>
//         Déjà un compte ? <a href="/login">Se connecter</a>
//       </p>
//     </div>
//   );
// };

// // Ajoutez cette validation des props
// SignupPage.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

// export default SignupPage;

import { useState } from "react";
import { signup } from "../api";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../CSS/SignupPage.css";

const SignupPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(email, password);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/taches");
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <h2>Inscription</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn">
            S inscrire
          </button>
        </form>
        <p>
          Déjà un compte ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

SignupPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default SignupPage;
