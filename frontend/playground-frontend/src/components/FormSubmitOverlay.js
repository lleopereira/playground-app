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

          {/* Checkbox fields */}
          {formData.cypress !== undefined && (
            <div 
              className="data-item"
              data-test-id="cypress-checkbox-data-item"
              id="cypress-checkbox-item"
            >
              <span 
                className="label"
                data-test-id="cypress-checkbox-label"
              >
                Cypress:
              </span>
              <span 
                className={`value checkbox-value ${formData.cypress ? 'selected' : 'unselected'}`}
                data-test-id="submitted-cypress-checkbox"
                id="submitted-cypress-checkbox-value"
              >
                {formData.cypress ? '✓ Selecionado' : '✗ Não selecionado'}
              </span>
            </div>
          )}

          {formData.robotFramework !== undefined && (
            <div 
              className="data-item"
              data-test-id="robot-framework-checkbox-data-item"
              id="robot-framework-checkbox-item"
            >
              <span 
                className="label"
                data-test-id="robot-framework-checkbox-label"
              >
                Robot Framework:
              </span>
              <span 
                className={`value checkbox-value ${formData.robotFramework ? 'selected' : 'unselected'}`}
                data-test-id="submitted-robot-framework-checkbox"
                id="submitted-robot-framework-checkbox-value"
              >
                {formData.robotFramework ? '✓ Selecionado' : '✗ Não selecionado'}
              </span>
            </div>
          )}

          {formData.playwright !== undefined && (
            <div 
              className="data-item"
              data-test-id="playwright-checkbox-data-item"
              id="playwright-checkbox-item"
            >
              <span 
                className="label"
                data-test-id="playwright-checkbox-label"
              >
                Playwright:
              </span>
              <span 
                className={`value checkbox-value ${formData.playwright ? 'selected' : 'unselected'}`}
                data-test-id="submitted-playwright-checkbox"
                id="submitted-playwright-checkbox-value"
              >
                {formData.playwright ? '✓ Selecionado' : '✗ Não selecionado'}
              </span>
            </div>
          )}

          {formData.selenium !== undefined && (
            <div 
              className="data-item"
              data-test-id="selenium-checkbox-data-item"
              id="selenium-checkbox-item"
            >
              <span 
                className="label"
                data-test-id="selenium-checkbox-label"
              >
                Selenium:
              </span>
              <span 
                className={`value checkbox-value ${formData.selenium ? 'selected' : 'unselected'}`}
                data-test-id="submitted-selenium-checkbox"
                id="submitted-selenium-checkbox-value"
              >
                {formData.selenium ? '✓ Selecionado' : '✗ Não selecionado'}
              </span>
            </div>
          )}

          {formData.puppeteer !== undefined && (
            <div 
              className="data-item"
              data-test-id="puppeteer-checkbox-data-item"
              id="puppeteer-checkbox-item"
            >
              <span 
                className="label"
                data-test-id="puppeteer-checkbox-label"
              >
                Puppeteer:
              </span>
              <span 
                className={`value checkbox-value ${formData.puppeteer ? 'selected' : 'unselected'}`}
                data-test-id="submitted-puppeteer-checkbox"
                id="submitted-puppeteer-checkbox-value"
              >
                {formData.puppeteer ? '✓ Selecionado' : '✗ Não selecionado'}
              </span>
            </div>
          )}

          {/* Radio Button fields */}
          {formData.selectedLanguage !== undefined && (
            <div 
              className="data-item"
              data-test-id="selected-language-data-item"
              id="selected-language-item"
            >
              <span 
                className="label"
                data-test-id="selected-language-label"
              >
                Linguagem Selecionada:
              </span>
              <span 
                className="value radio-value" 
                data-test-id="submitted-selected-language"
                id="submitted-selected-language-value"
              >
                {formData.selectedLanguage || 'Nenhuma selecionada'}
              </span>
            </div>
          )}

          {/* Select fields */}
          {formData.selectedFramework !== undefined && (
            <div 
              className="data-item"
              data-test-id="selected-framework-data-item"
              id="selected-framework-item"
            >
              <span 
                className="label"
                data-test-id="selected-framework-label"
              >
                Framework Selecionado:
              </span>
              <span
                className={`value select-value ${!formData.selectedFramework ? 'unselected' : ''}`}
                data-test-id="submitted-selected-framework"
                id="submitted-selected-framework-value"
              >
                {formData.selectedFramework || 'Nenhum selecionado'}
              </span>
            </div>
          )}

          {formData.selectedLanguages !== undefined && (
            <div 
              className="data-item"
              data-test-id="selected-languages-data-item"
              id="selected-languages-item"
            >
              <span 
                className="label"
                data-test-id="selected-languages-label"
              >
                Linguagens Selecionadas:
              </span>
              <span
                className={`value multiselect-value ${formData.selectedLanguages ? formData.selectedLanguages.length === 0 ? 'unselected' : '' : 'unselected'}`}
                data-test-id="submitted-selected-languages"
                id="submitted-selected-languages-value"
              >
                {formData.selectedLanguages || 'Nenhuma selecionada'}
              </span>
            </div>
          )}

          {/* Upload fields */}
          {formData.uploadedDocument !== undefined && (
            <div 
              className="data-item"
              data-test-id="uploaded-document-data-item"
              id="uploaded-document-item"
            >
              <span 
                className="label"
                data-test-id="uploaded-document-label"
              >
                Documento Enviado:
              </span>
              <span 
                className="value upload-value" 
                data-test-id="submitted-uploaded-document"
                id="submitted-uploaded-document-value"
              >
                {formData.uploadedDocument || 'Nenhum documento enviado'}
              </span>
            </div>
          )}

          {formData.uploadedImage !== undefined && (
            <div 
              className="data-item"
              data-test-id="uploaded-image-data-item"
              id="uploaded-image-item"
            >
              <span 
                className="label"
                data-test-id="uploaded-image-label"
              >
                Imagem Enviada:
              </span>
              <span 
                className="value upload-value" 
                data-test-id="submitted-uploaded-image"
                id="submitted-uploaded-image-value"
              >
                {formData.uploadedImage || 'Nenhuma imagem enviada'}
              </span>
            </div>
          )}

        </div>

        {/* Date section - Special layout below the main data */}
        {formData.selectedDate !== undefined && (
          <div className="date-section">
            <h3 
              className="date-section-title"
              data-test-id="date-section-title"
            >
              Data:
            </h3>
            <div 
              className="date-content" 
              data-test-id="submitted-date"
              id="submitted-date-value"
            >
              <div className="selected-date-display">
                {formData.selectedDate || 'Nenhuma data selecionada'}
              </div>
            </div>
          </div>
        )}

        {/* Tags section - Special layout below the main data */}
        {formData.tags !== undefined && (
          <div className="tags-section">
            <h3 
              className="tags-section-title"
              data-test-id="tags-section-title"
            >
              Tags Criadas
            </h3>
            <div 
              className="tags-content" 
              data-test-id="submitted-tags"
              id="submitted-tags-value"
            >
              {formData.tags && formData.tags.length > 0 ? (
                <ul className="tags-list">
                  {formData.tags.map((tag, index) => (
                    <li 
                      key={index} 
                      className="tag-list-item"
                      data-test-id={`tag-list-item-${index}`}
                    >
                      {index + 1} - {tag}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-tags">Nenhuma tag criada</div>
              )}
            </div>
          </div>
        )}

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
