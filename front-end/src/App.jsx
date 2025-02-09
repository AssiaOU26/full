import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import TacheList from "./components/TacheList";
import TacheForm from "./components/TacheForm";
import WelcomePage from "./components/welcompage";
import { PiSpinnerGapLight } from "react-icons/pi";

const App = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer le token du localStorage au chargement de l'application
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Réinitialiser le token dans l'état
    }
    setIsLoading(false); // Terminer le chargement
  }, []);

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = !!token;

  // Afficher un spinner pendant le chargement initial
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PiSpinnerGapLight size={50} color="#007bff" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/signup" element={<SignupPage setToken={setToken} />} />
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Routes protégées */}
        <Route
          path="/taches"
          element={
            isAuthenticated ? (
              <TacheList token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/taches/new"
          element={
            isAuthenticated ? (
              <TacheForm token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/taches/:id"
          element={
            isAuthenticated ? (
              <TacheForm token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Route par défaut */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/taches" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
