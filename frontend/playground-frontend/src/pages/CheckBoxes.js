import React, { useState } from 'react';
import './CheckBoxes.css';
import FormSubmitOverlay from '../components/FormSubmitOverlay';

export default function Checkboxes() {
    const [selectedFrameworks, setSelectedFrameworks] = useState({
        cypress: false,
        robotFramwork: false,
        playwright: false,
        selenium: false,
        puppeteer: false
    });

    const [showOverlay, setShowOverlay] = useState(false);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        setSelectedFrameworks(prevState => ({
            ...prevState,
            [name]: checked
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowOverlay(true);
    }

    return (
    <div
        className="page-content"
        id="checkboes-page"
        data-test-id="checkboxes-page-content"
            >
        <h1
        className="page-title"
        id="page-title"
        data-test-id="page-title-heading"
        
    >
        Checkbox
        </h1>

        <p className='page-description' data-test-id="page-description">
            Selecione os frameworks de automação de sua preferência.
        </p>

        <form
         onSubmit={handleSubmit}
         className='checkbox-form'
         id="checkbox-form"
         data-test-id="checkbox-form"
         aria-label="Framework selection form"
        >

        <fieldset className="checkbox-fieldset">
          <legend className="checkbox-legend">
          Frameworks de Automação:  
          </legend>

          {/* Cypress Checkbox */}
          <div 
            className="checkbox-group"
            data-test-id="cypress-checkbox-group"
            id="cypress-checkbox-group"
          >
            <input
              type="checkbox"
              id="cypress"
              name="cypress"
              data-test-id="cypress-checkbox"
              checked={selectedFrameworks.cypress}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <label 
              htmlFor="cypress"
              data-test-id="cypress-checkbox-label"
              className="checkbox-label"
            >
              Cypress
            </label>
          </div>

          {/* Robot Framework Checkbox */}
          <div 
            className="checkbox-group"
            data-test-id="robot-framework-checkbox-group"
            id="robot-framework-checkbox-group"
          >
            <input
              type="checkbox"
              id="robotFramework"
              name="robotFramework"
              data-test-id="robot-framework-checkbox"
              checked={selectedFrameworks.robotFramework}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <label 
              htmlFor="robotFramework"
              data-test-id="robot-framework-checkbox-label"
              className="checkbox-label"
            >
              Robot Framework
            </label>
          </div>

          {/* Playwright Checkbox */}
          <div 
            className="checkbox-group"
            data-test-id="playwright-checkbox-group"
            id="playwright-checkbox-group"
          >
            <input
              type="checkbox"
              id="playwright"
              name="playwright"
              data-test-id="playwright-checkbox"
              checked={selectedFrameworks.playwright}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <label 
              htmlFor="playwright"
              data-test-id="playwright-checkbox-label"
              className="checkbox-label"
            >
              Playwright
            </label>
          </div>

          {/* Selenium Checkbox */}
          <div 
            className="checkbox-group"
            data-test-id="selenium-checkbox-group"
            id="selenium-checkbox-group"
          >
            <input
              type="checkbox"
              id="selenium"
              name="selenium"
              data-test-id="selenium-checkbox"
              checked={selectedFrameworks.selenium}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <label 
              htmlFor="selenium"
              data-test-id="selenium-checkbox-label"
              className="checkbox-label"
            >
              Selenium
            </label>
          </div>

          {/* Puppeteer Checkbox */}
          <div 
            className="checkbox-group"
            data-test-id="puppeteer-checkbox-group"
            id="puppeteer-checkbox-group"
          >
            <input
              type="checkbox"
              id="puppeteer"
              name="puppeteer"
              data-test-id="puppeteer-checkbox"
              checked={selectedFrameworks.puppeteer}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <label 
              htmlFor="puppeteer"
              data-test-id="puppeteer-checkbox-label"
              className="checkbox-label"
            >
              Puppeteer
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Subnit framework selection"
        >
          Enviar
        </button>
        </form>

        {showOverlay && (
          <FormSubmitOverlay 
            formData={selectedFrameworks}
            onClose={() => setShowOverlay(false)}
          />
        )}
    </div>
  );
}
