import { useNavigate } from "react-router-dom";
import "../CSS/WelcomPage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bienvenue !</h2>
      <p>Votre compte a été créé avec succès.</p>
      <button onClick={() => navigate("/taches")}>Voir mes tâches</button>
    </div>
  );
};

export default WelcomePage;
