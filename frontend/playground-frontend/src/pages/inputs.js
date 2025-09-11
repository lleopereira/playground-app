import React, { useState } from 'react';
import './Inputs.css';

export default function Inputs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    number: '',
    search: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted with the following data:\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="page-content">
      <h1 id="page-title" data-test-id="page-title">Input Fields</h1>
      
      <form onSubmit={handleSubmit} className="input-form">
        {/* Text Input */}
        <div className="input-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            data-test-id="input-name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Digite seu nome"
          />
        </div>

        {/* Email Input */}
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            data-test-id="input-email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite seu email"
          />
        </div>

        {/* Phone Input */}
        <div className="input-group">
          <label htmlFor="phone">Telefone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            data-test-id="input-phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(00) 00000-0000"
          />
        </div>

        {/* Number Input */}
        <div className="input-group">
          <label htmlFor="number">Número:</label>
          <input
            type="number"
            id="number"
            name="number"
            data-test-id="input-number"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="Digite um número"
          />
        </div>

        {/* Search Input */}
        <div className="input-group">
          <label htmlFor="search">Pesquisar:</label>
          <input
            type="search"
            id="search"
            name="search"
            data-test-id="input-search"
            value={formData.search}
            onChange={handleInputChange}
            placeholder="Pesquisar..."
          />
        </div>

        <button 
          type="submit" 
          id="submit-button"
          data-test-id="button-submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
