import React from "react";
import "./UnderConstruction.css";

export default function UnderConstruction() {
  return (
    <div className="page-content">
      <div className="construction-container">
        <div className="construction-icon">
          🚧
        </div>
        <h2 id="construction-title" data-test-id="construction-title">
          Página em Construção
        </h2>
        <p id="construction-message" data-test-id="construction-message">
          Soon... my friends.
        </p>
      </div>
    </div>
  );
}
