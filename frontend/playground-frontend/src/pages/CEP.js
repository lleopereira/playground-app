import React, { useState } from 'react';
import './CEP.css';
import FormSubmitOverlay from '../components/FormSubmitOverlay';

/**
 * CEP Component - Brazilian Postal Code Search
 * 
 * This component allows users to search for Brazilian addresses using CEP (postal code)
 * It integrates with the ViaCEP API to fetch address information
 * 
 * Features:
 * - CEP input with validation and formatting
 * - API integration with ViaCEP service
 * - Address display with all fields (street, neighborhood, city, state)
 * - Loading states and error handling
 * - Form submission with overlay
 */
export default function CEP() {
  // State Management - Using React hooks to manage component state
  
  /**
   * cepInput: Stores the CEP value that user types
   * - Initially empty string
   * - Gets updated as user types
   * - Formatted automatically (XXXXX-XXX)
   */
  const [cepInput, setCepInput] = useState('');
  
  /**
   * addressData: Stores the address information returned from API
   * - null when no search performed yet
   * - Object with address fields when API returns data
   * - Contains: cep, logradouro, bairro, localidade, uf, etc.
   */
  const [addressData, setAddressData] = useState(null);
  
  /**
   * isLoading: Boolean flag to show loading state during API call
   * - false initially
   * - true when API request is in progress
   * - false when API request completes (success or error)
   */
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * error: Stores error message if something goes wrong
   * - null when no error
   * - String with error message when API fails or CEP is invalid
   */
  const [error, setError] = useState(null);
  
  /**
   * showOverlay: Controls the FormSubmitOverlay visibility
   * - false initially
   * - true when user clicks "Cadastrar" button
   */
  const [showOverlay, setShowOverlay] = useState(false);

  // Utility Functions

  /**
   * formatCEP - Formats CEP input with mask XXXXX-XXX
   * @param {string} value - Raw CEP value (only numbers)
   * @returns {string} - Formatted CEP with dash
   * 
   * Examples:
   * formatCEP('12345678') → '12345-678'
   * formatCEP('12345') → '12345'
   */
  const formatCEP = (value) => {
    // Remove all non-digit characters
    const numbersOnly = value.replace(/\D/g, '');
    
    // Apply mask: XXXXX-XXX
    if (numbersOnly.length > 5) {
      return `${numbersOnly.slice(0, 5)}-${numbersOnly.slice(5, 8)}`;
    }
    return numbersOnly;
  };

  /**
   * validateCEP - Checks if CEP has correct format
   * @param {string} cep - CEP string to validate
   * @returns {boolean} - true if valid, false if invalid
   * 
   * Valid CEP format: XXXXX-XXX (8 digits total)
   * Examples:
   * validateCEP('12345-678') → true
   * validateCEP('12345678') → true (accepts without dash)
   * validateCEP('12345') → false (incomplete)
   */
  const validateCEP = (cep) => {
    const numbersOnly = cep.replace(/\D/g, '');
    return numbersOnly.length === 8;
  };

  // Event Handler Functions

  /**
   * handleCEPChange - Updates CEP input with formatting
   * @param {Event} e - Input change event
   * 
   * Process:
   * 1. Get the raw value from input
   * 2. Format it with mask
   * 3. Update state
   * 4. Clear any previous errors
   */
  const handleCEPChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatCEP(rawValue);
    
    // Update CEP input state
    setCepInput(formattedValue);
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  /**
   * searchCEP - Performs API call to ViaCEP service
   * 
   * Process:
   * 1. Validate CEP format
   * 2. Set loading state
   * 3. Make API request
   * 4. Handle response (success/error)
   * 5. Update states accordingly
   * 
   * API URL: https://viacep.com.br/ws/{CEP}/json/
   * Response format: JSON with address fields
   */
  const searchCEP = async () => {
    // Validation: Check if CEP is valid before making API call
    if (!validateCEP(cepInput)) {
      setError('CEP deve ter 8 dígitos (XXXXX-XXX)');
      return;
    }

    // Prepare CEP for API (remove dash)
    const cleanCEP = cepInput.replace(/\D/g, '');
    
    // Set loading state (shows spinner/loading message)
    setIsLoading(true);
    setError(null); // Clear any previous errors
    setAddressData(null); // Clear any previous results

    try {
      // API Call: Fetch data from ViaCEP
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      
      // Check if HTTP request was successful
      if (!response.ok) {
        throw new Error('Erro na consulta ao CEP');
      }
      
      // Parse JSON response
      const data = await response.json();
      
      // Check if CEP was found (API returns erro: true for invalid CEPs)
      if (data.erro) {
        setError('CEP não encontrado');
        setAddressData(null);
      } else {
        // Success: Store address data
        setAddressData(data);
        setError(null);
      }
    } catch (err) {
      // Error handling: Network errors, JSON parsing errors, etc.
      setError('Erro ao buscar CEP. Verifique sua conexão.');
      setAddressData(null);
      console.error('CEP API Error:', err);
    } finally {
      // Always executed: Clear loading state
      setIsLoading(false);
    }
  };

  /**
   * handleSubmit - Handles form submission
   * @param {Event} e - Form submit event
   * 
   * Shows overlay with current form data (CEP and address if found)
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setShowOverlay(true); // Show success overlay
  };

  /**
   * handleKeyPress - Handles Enter key press in CEP input
   * @param {Event} e - Keyboard event
   * 
   * Allows user to search by pressing Enter instead of clicking button
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchCEP();
    }
  };

  // Component Render
  return (
    <div 
      className="page-content"
      id="cep-page"
      data-test-id="cep-page-content"
    >
      {/* Page Title */}
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Consultar CEP
      </h1>
      
      {/* Main Form Container */}
      <form 
        onSubmit={handleSubmit} 
        className="cep-form"
        id="cep-form"
        data-test-id="cep-form"
        aria-label="CEP address search form"
      >
        {/* Description Text */}
        <h2 className="form-subtitle">Endereço (Digite o CEP)</h2>

        {/* CEP Input Section */}
        <div 
          className="input-group"
          data-test-id="cep-input-group"
          id="cep-group"
        >
          <label 
            htmlFor="cep"
            data-test-id="cep-label"
            className="input-label"
          >
            {/* CEP */}
          </label>
          <div className="cep-input-container">
            <input
              type="text"
              id="cep"
              name="cep"
              data-test-id="cep-input"
              value={cepInput}
              onChange={handleCEPChange}
              onKeyPress={handleKeyPress}
              placeholder="04534-011"
              aria-describedby="cep-description"
              maxLength="9" // XXXXX-XXX format
              className={error ? 'error' : ''}
            />
            <button
              type="button"
              onClick={searchCEP}
              disabled={isLoading || !cepInput}
              className="search-button"
              data-test-id="search-cep-button"
              aria-label="Search address by CEP"
            >
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          {/* Error Message */}
          {error && (
            <div className="error-message" data-test-id="cep-error">
              {error}
            </div>
          )}
        </div>

        {/* Address Fields - Shown after successful CEP search */}
        {addressData && (
          <>
            {/* Street Address */}
            <div className="input-group" data-test-id="street-group">
              <label htmlFor="logradouro" className="input-label">
                Logradouro
              </label>
              <input
                type="text"
                id="logradouro"
                name="logradouro"
                value={addressData.logradouro || ''}
                readOnly
                className="readonly-input"
                data-test-id="street-input"
              />
            </div>

            {/* City and State Row */}
            <div className="input-row">
              <div className="input-group half-width" data-test-id="city-group">
                <label htmlFor="cidade" className="input-label">
                  Cidade
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={addressData.localidade || ''}
                  readOnly
                  className="readonly-input"
                  data-test-id="city-input"
                />
              </div>

              <div className="input-group half-width" data-test-id="state-group">
                <label htmlFor="estado" className="input-label">
                  Estado
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  value={addressData.uf || ''}
                  readOnly
                  className="readonly-input"
                  data-test-id="state-input"
                />
              </div>
            </div>
          </>
        )}

        {/* Submit Button - Only shown when address data is available */}
        {/* {addressData && (
          <button 
            type="submit" 
            id="submit-button"
            data-test-id="form-submit-button"
            className="submit-button"
            aria-label="Register address data"
          >
            Procurar
          </button>
        )} */}
      </form>

      {/* Conditional Overlay Rendering */}
      {showOverlay && (
        <FormSubmitOverlay 
          formData={{ 
            cep: cepInput,
            endereco: addressData 
          }}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}