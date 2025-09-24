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

    // Add class to body to hide hamburger menu
    document.body.classList.add('overlay-open');

    // Trap focus within dialog
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overlay-open');
    };
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
          {/* Conditional rendering for different form types */}
          {formData.name !== undefined && (
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
          )}
          
          {formData.email !== undefined && (
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
          )}
          
          {formData.phone !== undefined && (
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
          )}
          
          {formData.number !== undefined && (
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
          )}
          
          {formData.search !== undefined && (
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
          )}
          
          {formData.date !== undefined && (
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
          )}

          {/* TextArea fields */}
          {formData.basicTextarea !== undefined && (
            <div 
              className="data-item"
              data-test-id="basic-textarea-data-item"
              id="basic-textarea-item"
            >
              <span 
                className="label"
                data-test-id="basic-textarea-label"
              >
                Texto Básico:
              </span>
              <span 
                className="value textarea-value" 
                data-test-id="submitted-basic-textarea"
                id="submitted-basic-textarea-value"
              >
                {formData.basicTextarea || '-'}
              </span>
            </div>
          )}

          {formData.descriptionTextarea !== undefined && (
            <div 
              className="data-item"
              data-test-id="description-textarea-data-item"
              id="description-textarea-item"
            >
              <span 
                className="label"
                data-test-id="description-textarea-label"
              >
                Descrição:
              </span>
              <span 
                className="value textarea-value" 
                data-test-id="submitted-description-textarea"
                id="submitted-description-textarea-value"
              >
                {formData.descriptionTextarea || '-'}
              </span>
            </div>
          )}

          {formData.commentTextarea !== undefined && (
            <div 
              className="data-item"
              data-test-id="comment-textarea-data-item"
              id="comment-textarea-item"
            >
              <span 
                className="label"
                data-test-id="comment-textarea-label"
              >
                Comentários:
              </span>
              <span 
                className="value textarea-value" 
                data-test-id="submitted-comment-textarea"
                id="submitted-comment-textarea-value"
              >
                {formData.commentTextarea || '-'}
              </span>
            </div>
          )}

          {formData.messageTextarea !== undefined && (
            <div 
              className="data-item"
              data-test-id="message-textarea-data-item"
              id="message-textarea-item"
            >
              <span 
                className="label"
                data-test-id="message-textarea-label"
              >
                Mensagem Especial:
              </span>
              <span 
                className="value textarea-value" 
                data-test-id="submitted-message-textarea"
                id="submitted-message-textarea-value"
              >
                {formData.messageTextarea || '-'}
              </span>
            </div>
          )}
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
