import { useState } from "react";
import { login } from "../api";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginPage.css";

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/taches");
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username" // Ajoutez cet attribut
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password" // Ajoutez cet attribut
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas de compte ? <a href="/signup">S inscrire</a>
      </p>
    </div>
  );
};

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginPage;
