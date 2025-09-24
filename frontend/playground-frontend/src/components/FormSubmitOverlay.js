import React, { useEffect, useRef } from 'react';
import './FormSubmitOverlay.css';

export default function FormSubmitOverlay({ formData, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Trap focus within dialog
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="overlay"
      id="form-submit-overlay"
      data-test-id="form-overlay-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlay-title"
      aria-describedby="submitted-data"
      ref={dialogRef}
    >
      <div 
        className="overlay-content" 
        data-test-id="submit-overlay"
        id="overlay-content"
        role="document"
      >
        <h2 
          className="overlay-title" 
          data-test-id="overlay-title-heading"
          id="overlay-title"
        >
          Dados Enviados
        </h2>
        
        <div 
          className="data-list"
          data-test-id="submitted-data-list"
          id="submitted-data"
        >
          <div 
            className="data-item"
            data-test-id="name-data-item"
            id="name-item"
          >
            <span 
              className="label"
              data-test-id="name-label"
            >
              Nome:
            </span>
            <span 
              className="value" 
              data-test-id="submitted-name"
              id="submitted-name-value"
            >
              {formData.name || '-'}
            </span>
          </div>
          
          <div 
            className="data-item"
            data-test-id="email-data-item"
            id="email-item"
          >
            <span 
              className="label"
              data-test-id="email-label"
            >
              Email:
            </span>
            <span 
              className="value" 
              data-test-id="submitted-email"
              id="submitted-email-value"
            >
              {formData.email || '-'}
            </span>
          </div>
          
          <div 
            className="data-item"
            data-test-id="phone-data-item"
            id="phone-item"
          >
            <span 
              className="label"
              data-test-id="phone-label"
            >
              Telefone:
            </span>
            <span 
              className="value" 
              data-test-id="submitted-phone"
              id="submitted-phone-value"
            >
              {formData.phone || '-'}
            </span>
          </div>
          
          <div 
            className="data-item"
            data-test-id="number-data-item"
            id="number-item"
          >
            <span 
              className="label"
              data-test-id="number-label"
            >
              Número:
            </span>
            <span 
              className="value" 
              data-test-id="submitted-number"
              id="submitted-number-value"
            >
              {formData.number || '-'}
            </span>
          </div>
          
          <div 
            className="data-item"
            data-test-id="search-data-item"
            id="search-item"
          >
            <span 
              className="label"
              data-test-id="search-label"
            >
              Pesquisa:
            </span>
            <span 
              className="value" 
              data-test-id="submitted-search"
              id="submitted-search-value"
            >
              {formData.search || '-'}
            </span>
          </div>
          
          <div 
            className="data-item"
            data-test-id="date-data-item"
            id="date-item"
          >
            <span 
              className="label"
              data-test-id="date-label"
            >
              Data:
            </span>
            <span 
              className="value" 
              data-test-id="submitted-date"
              id="submitted-date-value"
            >
              {formData.date || '-'}
            </span>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="close-button"
          data-test-id="close-overlay-button"
          id="close-overlay-btn"
          type="button"
          aria-label="Fechar modal de dados enviados"
          ref={closeButtonRef}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
