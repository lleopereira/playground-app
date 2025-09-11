import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Playground.css";
import robotImage from "../assets/robot.gif";

export default function Playground() {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Redirect to the main page
    navigate("/");
  };

  return (
    <div className="page-content">
      <main className="main" role="main">
        {/* Logout */}
        <div
          className="logout"
          id="logout-btn"
          data-test-id="logout-btn"
          onClick={handleLogout}
          role="button"
          aria-label="Logout"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/logout-rounded.png"
            alt="Logout Icon"
            id="logout-icon"
            data-test-id="logout-icon"
          />
        </div>

        {/* Central Image (placeholder for 8-bit robot) */}
        
        <img
          src={robotImage}
          alt="8-bit Robot Placeholder"
          id="robot-img"
          data-test-id="robot-img"
        />

        {/* Titles */}
        <h2 id="welcome-title" data-test-id="welcome-title">
          Boas-vindas ao Playground de Testes
        </h2>
        <p id="welcome-paragraph" data-test-id="welcome-paragraph">
          Aplicação desenvolvida para praticar automação com a intenção de aprimorarmos
          suas habilidades em qualquer framework de teste, tais como Playwright, Cypress, Robot e outros.
        </p>
      </main>
    </div>
  );
}
