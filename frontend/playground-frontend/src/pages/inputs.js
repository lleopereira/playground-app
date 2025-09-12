import React, { useState } from 'react';
import './Inputs.css';
import FormSubmitOverlay from '../components/FormSubmitOverlay';

export default function Inputs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    number: '',
    search: '',
    date: ''
  });
  const [showOverlay, setShowOverlay] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  return (
    <div 
      className="page-content"
      id="inputs-page"
      data-test-id="inputs-page-content"
    >
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Input Fields
      </h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="input-form"
        id="inputs-form"
        data-test-id="input-form"
        role="form"
        aria-label="Input fields demonstration form"
      >
        {/* Text Input */}
        <div 
          className="input-group"
          data-test-id="name-input-group"
          id="name-group"
        >
          <label 
            htmlFor="name"
            data-test-id="name-label"
            className="input-label"
          >
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            data-test-id="text-input-name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Digite seu nome"
            aria-describedby="name-description"
            autoComplete="name"
          />
        </div>

        {/* Email Input */}
        <div 
          className="input-group"
          data-test-id="email-input-group"
          id="email-group"
        >
          <label 
            htmlFor="email"
            data-test-id="email-label"
            className="input-label"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            data-test-id="email-input"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite seu email"
            aria-describedby="email-description"
            autoComplete="email"
          />
        </div>

        {/* Phone Input */}
        <div 
          className="input-group"
          data-test-id="phone-input-group"
          id="phone-group"
        >
          <label 
            htmlFor="phone"
            data-test-id="phone-label"
            className="input-label"
          >
            Telefone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            data-test-id="tel-input-phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(00) 00000-0000"
            aria-describedby="phone-description"
            autoComplete="tel"
          />
        </div>

        {/* Number Input */}
        <div 
          className="input-group"
          data-test-id="number-input-group"
          id="number-group"
        >
          <label 
            htmlFor="number"
            data-test-id="number-label"
            className="input-label"
          >
            Número:
          </label>
          <input
            type="number"
            id="number"
            name="number"
            data-test-id="number-input"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="Digite um número"
            aria-describedby="number-description"
            min="0"
            step="1"
          />
        </div>

        {/* Search Input */}
        <div 
          className="input-group"
          data-test-id="search-input-group"
          id="search-group"
        >
          <label 
            htmlFor="search"
            data-test-id="search-label"
            className="input-label"
          >
            Pesquisar:
          </label>
          <input
            type="search"
            id="search"
            name="search"
            data-test-id="search-input"
            value={formData.search}
            onChange={handleInputChange}
            placeholder="Pesquisar..."
            aria-describedby="search-description"
          />
        </div>

        {/* Date Input */}
        <div 
          className="input-group"
          data-test-id="date-input-group"
          id="date-group"
        >
          <label 
            htmlFor="date"
            data-test-id="date-label"
            className="input-label"
          >
            Data:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            data-test-id="date-input"
            value={formData.date}
            onChange={handleInputChange}
            aria-describedby="date-description"
          />
        </div>

        <button 
          type="submit" 
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Submit form data"
        >
          Enviar
        </button>
      </form>
      {showOverlay && (
        <FormSubmitOverlay 
          formData={formData}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}
