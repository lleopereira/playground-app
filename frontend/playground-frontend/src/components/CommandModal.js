import React, { useEffect, useRef } from 'react';
import './CommandModal.css';

const CommandModal = ({ command, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTabTrap = (e) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTabTrap);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !command) return null;

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'navigation': return '#3498db';
      case 'locators': return 'rgb(243, 156, 18)';
      case 'assertions': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <div className="modal-title-container">
            <h2 id="modal-title" className="modal-title">{command.name}</h2>
            <span 
              className="modal-category" 
              style={{ backgroundColor: getCategoryColor(command.category) }}
            >
              {command.category}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="modal-close"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Description</h3>
            <p className="modal-description">{command.description}</p>
          </div>

          <div className="modal-section">
            <h3>Syntax</h3>
            <div className="syntax-box">
              <code>{command.syntax}</code>
            </div>
          </div>

          {command.parameters && command.parameters.length > 0 && (
            <div className="modal-section">
              <h3>Parameters</h3>
              <div className="parameters-table">
                <div className="parameters-header">
                  <div className="param-name">Parameter</div>
                  <div className="param-type">Type</div>
                  <div className="param-description">Description</div>
                </div>
                {command.parameters.map((param, index) => (
                  <div key={index} className="parameter-row">
                    <div className="param-name">
                      <code>{param.name}</code>
                      {param.required && <span className="required">*</span>}
                    </div>
                    <div className="param-type">
                      <span className="type-badge">{param.type}</span>
                    </div>
                    <div className="param-description">{param.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {command.example && (
            <div className="modal-section">
              <h3>Example</h3>
              <div className="example-box">
                <pre><code>{command.example}</code></pre>
              </div>
            </div>
          )}

          {command.notes && (
            <div className="modal-section">
              <h3>Notes</h3>
              <div className="notes-box">
                <p>{command.notes}</p>
              </div>
            </div>
          )}

          {command.relatedCommands && command.relatedCommands.length > 0 && (
            <div className="modal-section">
              <h3>Related Commands</h3>
              <div className="related-commands">
                {command.relatedCommands.map((relatedCmd, index) => (
                  <span key={index} className="related-command">
                    {relatedCmd}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandModal;
