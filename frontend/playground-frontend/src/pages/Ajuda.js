import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Ajuda.css';

export default function Ajuda() {
  const navigate = useNavigate();

  const handleNavigateToBrowserCommands = () => {
    navigate('/browser-commands');
  };

  const handleNavigateToCliCommands = () => {
    navigate('/cli-commands');
  };

  return (
    <div 
      className="page-content"
      id="ajuda-page"
      data-test-id="ajuda-page-content"
      role="main"
    >
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Ajuda
      </h1>
      
      <h2 
        id="help-subtitle"
        data-test-id="help-subtitle"
        className="help-subtitle"
      >
        Documentação e Comandos de Referência
      </h2>

      <p className="page-description" data-test-id="page-description">
        Aqui você encontra toda a documentação necessária para trabalhar com Robot Framework. 
        Acesse os comandos da biblioteca Browser ou consulte os comandos de terminal (CLI).
      </p>

      {/* Help Cards Section */}
      <div className="help-cards-container" data-test-id="help-cards-container">
        
        {/* CLI Commands Card */}
        <div 
          className="help-card cli-commands-card"
          data-test-id="cli-commands-card"
          role="article"
          aria-labelledby="cli-card-title"
        >
          <div className="help-card-header">
            <div className="help-card-icon cli-icon" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M8 7l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="help-card-text">
              <h3 id="cli-card-title" className="help-card-title">
                Comandos CLI (terminal)
              </h3>
              <p className="help-card-description">
                Lista completa de comandos do Robot Framework para execução via terminal. 
                Inclui exemplos práticos de execução, filtros, configurações e debugging.
              </p>
            </div>
          </div>
          
          <div className="help-card-features">
            <ul className="features-list" role="list">
              <li role="listitem">
                <span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" aria-label="Execução de testes individuais e em massa"><title>Execução de testes individuais e em massa</title><g stroke-width="1.6"><rect x="2.5" y="6" width="9" height="12" rx="1.6"></rect><rect x="12.5" y="3" width="9" height="15" rx="1.6"></rect><path d="M5 9h5"></path><path d="M14 6h5"></path><path d="M8 19v-2"></path><path d="M17 18v-3"></path></g></svg></span>
                Execução de testes individuais e em massa
              </li>
              <li role="listitem">
                <span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" aria-label="Filtros por tags e suites"><title>Filtros por tags e suites</title><g><path d="M3 6h10"></path><path d="M7 10h14"></path><path d="M11 14h6"></path><circle cx="4" cy="6" r="2"></circle><circle cx="9" cy="10" r="2"></circle><circle cx="14" cy="14" r="2"></circle></g></svg></span>
                Filtros por tags e suites
              </li>
              <li role="listitem">
                <span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" aria-label="Configurações avançadas e debugging"><title>Configurações avançadas e debugging</title><g><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><circle cx="12" cy="12" r="4"></circle><path d="M8 12h8"></path><rect x="2" y="20" width="20" height="2" rx="1"></rect></g></svg></span>
                Configurações avançadas e debugging
              </li>
              <li role="listitem">
                <span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" aria-label="Execução paralela com pabot"><title>Execução paralela com pabot</title><g><rect x="2" y="7" width="7" height="10" rx="1.2"></rect><rect x="9.5" y="4" width="7" height="14" rx="1.2"></rect><rect x="17" y="10" width="5" height="7" rx="1.2"></rect><path d="M4 12h3"></path><path d="M11 10h3"></path><path d="M19 13h2"></path><path d="M12 21v-3"></path></g></svg></span>
                Execução paralela com pabot
              </li>
            </ul>
          </div>

          <button 
            onClick={handleNavigateToCliCommands}
            className="help-card-button cli-button"
            data-test-id="cli-commands-button"
            aria-label="Acessar página de comandos CLI do Robot Framework"
          >
            <span>Ver Comandos CLI</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Browser Commands Card */}
        <div 
          className="help-card browser-commands-card"
          data-test-id="browser-commands-card"
          role="article"
          aria-labelledby="browser-card-title"
        >
          <div className="help-card-header">
            <div className="help-card-icon browser-icon" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="2"/>
                <circle cx="7" cy="5" r="0.5" fill="currentColor"/>
                <circle cx="9" cy="5" r="0.5" fill="currentColor"/>
                <circle cx="11" cy="5" r="0.5" fill="currentColor"/>
              </svg>
            </div>
            <div className="help-card-text">
              <h3 id="browser-card-title" className="help-card-title">
                Biblioteca Browser
              </h3>
              <p className="help-card-description">
                Referência completa dos comandos da biblioteca Browser do Robot Framework. 
                Navegação, localizadores, verificações e muito mais com exemplos práticos.
              </p>
            </div>
          </div>
          
          <div className="help-card-features">
            <ul className="features-list" role="list">
              <li role="listitem">
                <span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" aria-label="Comandos de navegação e páginas"><title>Comandos de navegação e páginas</title><g><rect x="3" y="3" width="18" height="14" rx="1.6"></rect><path d="M7 21h10"></path><path d="M7 8h10"></path><path d="M10 11v8"></path></g></svg></span>
                Comandos de navegação e páginas
              </li>
              <li role="listitem">
                <span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" aria-label="Localizadores e interações"><title>Localizadores e interações</title><g><path d="M12 2a6 6 0 016 6c0 5-6 10-6 10s-6-5-6-10a6 6 0 016-6z"></path><circle cx="12" cy="8" r="1.6"></circle><path d="M17 13l3 3"></path><path d="M6 16l4-4"></path></g></svg></span>
                Localizadores e interações
              </li>
              <li role="listitem">
                <span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" aria-label="Verificações e assertions"><title>Verificações e assertions</title><g><circle cx="12" cy="12" r="9"></circle><path d="M8 12.5l2 2 6-6"></path><path d="M12 6v1"></path><path d="M12 17v1"></path></g></svg></span>
                Verificações e assertions
              </li>
              <li role="listitem">
                <span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" aria-label="Exemplos e documentação detalhada"><title>Exemplos e documentação detalhada</title><g><rect x="3" y="4" width="18" height="16" rx="1.2"></rect><path d="M7 8h10"></path><path d="M7 12h10"></path><path d="M7 16h6"></path><circle cx="17.5" cy="17.5" r="2.2"></circle><path d="M16.2 16.2l2.6 2.6"></path></g></svg></span>
                Exemplos e documentação detalhada
              </li>
            </ul>
          </div>

          <button 
            onClick={handleNavigateToBrowserCommands}
            className="help-card-button browser-button"
            data-test-id="browser-commands-button"
            aria-label="Acessar página de comandos da biblioteca Browser"
          >
            <span>Ver Comandos Browser</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
