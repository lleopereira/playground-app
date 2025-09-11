import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Playground.css";
import robotImage from "../assets/robot.gif";

export default function Playground() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page-content">
      {/* Central Image (placeholder for 8-bit robot) */}
      <img
        src={robotImage}
        alt="8-bit Robot Placeholder"
        id="robot-img"
        data-test-id="robot-img"
      />

      {/* Content */}
      <div className="content-wrapper">
        <h2 id="welcome-title" data-test-id="welcome-title">
          Boas-vindas ao Playground de Testes
        </h2>
        <p id="welcome-paragraph" data-test-id="welcome-paragraph">
          Aplicação desenvolvida para praticar automação com a intenção de aprimorarmos
          suas habilidades em qualquer framework de teste, tais como Playwright, Cypress, Robot e outros.
        </p>
      </div>
    </div>
  );
}
