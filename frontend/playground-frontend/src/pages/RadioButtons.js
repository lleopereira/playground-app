import React, { useState } from 'react';
import './RadioButtons.css';
import FormSubmitOverlay from '../components/FormSubmitOverlay';

export default function RadioButtons() {

    const [ selectedLanguage, setSelectedLanguage] = useState('')
    const [ showOverlay, setShowOverlay] = useState(false)

    const handleRadioChange = (e) => {
        const { value } = e.target
        setSelectedLanguage(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowOverlay(true)
    }

    return (
        <div
            className="page-content"
            id="radio-buttons-page"
            data-test-id="radio-buttons-page-content"
        >
         <h1
            id="page-title"
            data-test-id="page-title-heading"
            className="page-title"
        >
          Radio Buttons
        </h1>

        <h3
            className="page-subtitle"
            data-test-id="page-subtitle"
        >
          Selecione uma linguagem de programação
        </h3>
        
        <form
          onSubmit={handleSubmit}
          className="radio-form"
          id="radio-form"
          data-test-id="radio-form"
          aria-label="Programming language selection form"
        >
          <fieldset className="radio-fieldset">
            <legend className="radio-legend">
              Linguagens de Programação:
            </legend>

            <div
             className="radio-group"
             data-test-id="radio-group"
             id="javascript-radio-group"
            >
             <input
                type="radio"
                id="javascript"
                name="programmingLanguage"
                value="javascritpt"
                data-test-id="javascript-radio"
                checked={selectedLanguage === 'javascritpt'}
                onChange={handleRadioChange}
                className="radio-input"
                aria-describedby="javascript-language"
              />
              <label
                htmlFor="javascript"
                data-test-id="javascript-radio-label"
                className="radio-label"
              >
                JavaScript
              </label>
            </div>

            <div 
            className="radio-group"
            data-test-id="python-radio-group"
            id="python-radio-group"
          >
            <input
              type="radio"
              id="python"
              name="programmingLanguage"
              value="python"
              data-test-id="python-radio"
              checked={selectedLanguage === 'python'}
              onChange={handleRadioChange}
              className="radio-input"
              aria-describedby='python-language'
            />
            <label 
              htmlFor="python"
              data-test-id="python-radio-label"
              className="radio-label"
            >
              Python
            </label>
          </div>

          <div 
            className="radio-group"
            data-test-id="java-radio-group"
            id="java-radio-group"
          >
            <input
              type="radio"
              id="java"
              name="programmingLanguage"
              value="java"
              data-test-id="java-radio"
              checked={selectedLanguage === 'java'}
              onChange={handleRadioChange}
              className="radio-input"
              aria-describedby='java-language'
            />
            <label 
              htmlFor="java"
              data-test-id="java-radio-label"
              className="radio-label"
            >
              Java
            </label>
          </div>  
        
          <div 
            className="radio-group"
            data-test-id="csharp-radio-group"
            id="csharp-radio-group"
          >
            <input
              type="radio"
              id="csharp"
              name="programmingLanguage"
              value="csharp"
              data-test-id="csharp-radio"
              checked={selectedLanguage === 'csharp'}
              onChange={handleRadioChange}
              className="radio-input"
              aria-describedby='c#-language'
            />
            <label 
              htmlFor="csharp"
              data-test-id="csharp-radio-label"
              className="radio-label"
            >
              C#
            </label>
          </div>

          <div 
            className="radio-group"
            data-test-id="go-radio-group"
            id="go-radio-group"
          >
            <input
              type="radio"
              id="go"
              name="programmingLanguage"
              value="go"
              data-test-id="go-radio"
              checked={selectedLanguage === 'go'}
              onChange={handleRadioChange}
              className="radio-input"
              aria-describedby='go-language'
            />
            <label 
              htmlFor="go"
              data-test-id="go-radio-label"
              className="radio-label"
            >
              Go
            </label>
          </div>
        </fieldset>

        <button 
          type="submit" 
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Submit selected programming language"
        >
          Enviar
        </button>
      </form>

      {showOverlay && (
        <FormSubmitOverlay 
          formData={{ selectedLanguage }}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  )
}