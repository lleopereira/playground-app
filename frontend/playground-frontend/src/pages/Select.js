import React, { useState } from 'react'
import './Select.css'
import FormSubmitOverlay from '../components/FormSubmitOverlay'

export default function Select() {

    const [ selectedFramework, setSelectedFramework ] = useState('')
    const [ selectedLanguages, setSelectedLanguages ] = useState([])
    const [ isMultiSelectOpen, setIsMultiSelectOpen ] = useState(false)
    const [ showOverlay, setShowOverlay ] = useState(false)

    const frameworkOptions = [
    
       
       { value: 'jest', label: 'Jest' },
       { value: 'mocha', label: 'Mocha' },
       { value: 'cypress', label: 'Cypress' },
       { value: 'playwright', label: 'Playwright' },
       { value: 'robot-framework', label: 'Robot Framework' },
       { value: 'jasmine', label: 'Jasmine' },
       { value: 'testcafe', label: 'TestCafe' },
       { value: 'puppeteer', label: 'Puppeteer' },
       { value: 'nightwatch', label: 'Nightwatch' }
    
    ]

    const languageOptions = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'csharp', label: 'C#' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'go', label: 'Go' },
        { value: 'php', label: 'PHP' },
        { value: 'typescript', label: 'TypeScript' }
    ]

    const handleFrameworkChange = (e) => {
        setSelectedFramework(e.target.value)
    }

    const handleLanguageSelect = (language) => {
        if (!selectedLanguages.find(lang => lang.value === language.value)) {
            setSelectedLanguages([...selectedLanguages, language])
        }
        setIsMultiSelectOpen(false)
    }

    const removeLanguage = (languageToRemove) => {
        setSelectedLanguages(selectedLanguages.filter(
          lang => lang.value !== languageToRemove.value))
    }

    const toggleMultiSelect = () => {
        setIsMultiSelectOpen(!isMultiSelectOpen)
    }

    const handleMultiSelectBlur = () => {
        setTimeout(() => setIsMultiSelectOpen(false), 150)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowOverlay(true)
    }

    return (
      <div
        className="page-content"
        id="select-page"
        data-test-id="select-page-content"
      >
        <h1
          id="page-title"
          data-test-id="page-title-heading"
          className="page-title"
        >
          Select
        </h1>

        <form 
        onSubmit={handleSubmit} 
        className="select-form"
        id="select-form"
        data-test-id="select-form"
        aria-label="Select options form"
      >
        {/* Single Select Field */}
        <div className="form-group">
          <label 
            htmlFor="framework-select"
            className="form-label"
            data-test-id="framework-select-label"
          >
            Selecione um framework de testes:
          </label>
          <select
            id="framework-select"
            name="framework"
            value={selectedFramework}
            onChange={handleFrameworkChange}
            className="select-input"
            data-test-id="framework-select"
            aria-describedby="framework-help"
          >
            <option value="" disabled>
              Selecione aqui...
            </option>
            {frameworkOptions.map(option => (
              <option 
                key={option.value} 
                value={option.value}
                data-test-id={`framework-option-${option.value}`}
              >
                {option.label}
              </option>
            ))}
          </select>
          <small 
            id="framework-help" 
            className="form-help"
            data-test-id="framework-help-text"
          >
            Escolha um framework para seus testes automatizados
          </small>
        </div>

        {/* Multi-Select Field */}
        <div className="form-group">
          <label 
            htmlFor="language-multiselect"
            className="form-label"
            data-test-id="language-multiselect-label"
          >
            Caixa de múltipla escolha:
          </label>
          
          {/* Multi-Select Container */}
          <div 
            className="multiselect-container"
            data-test-id="language-multiselect-container"
          >
            {/* Selected Languages Tags */}
            <div 
              className="selected-tags"
              data-test-id="selected-languages-tags"
            >
              {selectedLanguages.map(language => (
                <span 
                  key={language.value}
                  className="tag"
                  data-test-id={`selected-tag-${language.value}`}
                >
                  {language.label}
                  <button
                    type="button"
                    onClick={() => removeLanguage(language)}
                    className="tag-remove"
                    data-test-id={`remove-tag-${language.value}`}
                    aria-label={`Remove ${language.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              
              {/* Dropdown Trigger */}
              <button
                type="button"
                onClick={toggleMultiSelect}
                onBlur={handleMultiSelectBlur}
                className="multiselect-trigger"
                data-test-id="multiselect-trigger"
                aria-haspopup="listbox"
                aria-expanded={isMultiSelectOpen}
                id="language-multiselect"
              >
                {selectedLanguages.length === 0 ? 'Linguagens de programação' : 'Adicionar'}
                <span className="dropdown-arrow">▼</span>
              </button>
            </div>

            {/* Dropdown Options */}
            {isMultiSelectOpen && (
              <div 
                className="multiselect-dropdown"
                data-test-id="multiselect-dropdown"
                role="listbox"
              >
                {languageOptions
                  .filter(option => !selectedLanguages.find(lang => lang.value === option.value))
                  .map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleLanguageSelect(option)}
                      className="multiselect-option"
                      data-test-id={`language-option-${option.value}`}
                      role="option"
                    >
                      {option.label}
                    </button>
                  ))}
                {languageOptions.filter(option => !selectedLanguages.find(lang => lang.value === option.value)).length === 0 && (
                  <div 
                    className="no-options"
                    data-test-id="no-more-options"
                  >
                    Todas as linguagens foram selecionadas
                  </div>
                )}
              </div>
            )}
          </div>
          
          <small 
            className="form-help"
            data-test-id="language-help-text"
          >
            Selecione uma ou mais linguagens de programação
          </small>
        </div>

        <button 
          type="submit" 
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Submit select form"
        >
          Enviar
        </button>
      </form>

      {showOverlay && (
        <FormSubmitOverlay 
          formData={{ 
            selectedFramework,
            selectedLanguages: selectedLanguages.map(lang => lang.label).join(', ')
          }}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div> 
    )
}