import React from 'react';
import './FormSubmitOverlay.css';

export default function FormSubmitOverlay({ formData, onClose }) {
  return (
    <div className="overlay">
      <div className="overlay-content" data-test-id="submit-overlay">
        <h2 className="overlay-title" data-test-id="overlay-title">Dados Enviados</h2>
        
        <div className="data-list">
          <div className="data-item">
            <span className="label">Nome:</span>
            <span className="value" data-test-id="submitted-name">{formData.name || '-'}</span>
          </div>
          
          <div className="data-item">
            <span className="label">Email:</span>
            <span className="value" data-test-id="submitted-email">{formData.email || '-'}</span>
          </div>
          
          <div className="data-item">
            <span className="label">Telefone:</span>
            <span className="value" data-test-id="submitted-phone">{formData.phone || '-'}</span>
          </div>
          
          <div className="data-item">
            <span className="label">Número:</span>
            <span className="value" data-test-id="submitted-number">{formData.number || '-'}</span>
          </div>
          
          <div className="data-item">
            <span className="label">Pesquisa:</span>
            <span className="value" data-test-id="submitted-search">{formData.search || '-'}</span>
          </div>
          
          <div className="data-item">
            <span className="label">Data:</span>
            <span className="value" data-test-id="submitted-date">{formData.date || '-'}</span>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="close-button"
          data-test-id="close-overlay-button"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
