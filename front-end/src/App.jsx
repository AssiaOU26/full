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

const App = () => {
  const [token, setToken] = useState("");

  // Récupérez le token du localStorage au chargement de l'application
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fonction pour vérifier si l'utilisateur est connecté
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/signup" element={<SignupPage setToken={setToken} />} />
        <Route path="/welcome" element={<WelcomePage />} />
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
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
