import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Playground.css";
import robotImage from "../assets/robot.gif";

export default function Playground() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div 
      className="page-content"
      id="playground-page"
      data-test-id="playground-page-content"
      role="main"
    >
      {/* Logout button for playground page only */}
      <button 
        className="playground-logout-button" 
        onClick={handleLogout}
        data-test-id="playground-logout-button"
        id="playground-logout-btn"
        type="button"
        aria-label="Logout from application"
      >
        Logout
      </button>

      {/* Central Image (placeholder for 8-bit robot) */}
      <img
        src={robotImage}
        alt="8-bit Robot Placeholder"
        id="robot-image"
        data-test-id="robot-gif"
        className="robot-image"
        loading="lazy"
      />

      {/* Content */}
      <div 
        className="content-wrapper"
        id="welcome-content"
        data-test-id="welcome-content-wrapper"
      >
        <h2 
          id="welcome-title" 
          data-test-id="welcome-heading"
          className="welcome-title"
        >
          Boas-vindas ao Playground de Testes
        </h2>
        <p 
          id="welcome-description" 
          data-test-id="welcome-paragraph"
          className="welcome-description"
        >
          Aplicação desenvolvida para praticar automação com a intenção de aprimorarmos
          suas habilidades em qualquer framework de teste, tais como Playwright, Cypress, Robot e outros.
        </p>
      </div>
    </div>
  );
}
