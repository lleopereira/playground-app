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
  
  // Form validation state for accessibility
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Nome é obrigatório';
        } else if (value.trim().length < 2) {
          error = 'Nome deve ter pelo menos 2 caracteres';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email deve ter um formato válido';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Telefone é obrigatório';
        } else if (value.length < 10) {
          error = 'Telefone deve ter pelo menos 10 dígitos';
        }
        break;
      case 'number':
        if (value && (isNaN(value) || value < 0)) {
          error = 'Número deve ser positivo';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Validate field if it was already touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    // Remove all non-digits
    value = value.replace(/\D/g, '');
    // Limit to 11 digits
    value = value.slice(0, 11);
    
    setFormData(prevState => ({
      ...prevState,
      phone: value
    }));

    // Validate phone if it was already touched
    if (touched.phone) {
      const error = validateField('phone', value);
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: error
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    const newTouched = {};
    
    Object.keys(formData).forEach(field => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    // If no errors, show overlay
    if (Object.keys(newErrors).length === 0) {
      setShowOverlay(true);
    }
    
    setIsSubmitting(false);
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
        aria-label="Input fields demonstration form"
        aria-describedby="form-description"
        noValidate
      >
        {/* Form description for screen readers */}
        <div 
          id="form-description" 
          className="sr-only"
          aria-hidden="false"
        >
          Formulário de demonstração com diferentes tipos de entrada de dados. Campos obrigatórios são marcados e validados em tempo real.
        </div>

        {/* Live region for form validation announcements */}
        <div 
          id="form-status"
          aria-live="polite" 
          aria-atomic="true"
          className="sr-only"
        >
          {isSubmitting && "Validando formulário..."}
          {Object.keys(errors).length > 0 && touched && "Existem erros no formulário que precisam ser corrigidos."}
        </div>
        {/* Text Input */}
        <div 
          className="input-group"
          data-test-id="name-input-group"
          id="name-group"
          role="group"
          aria-labelledby="name-label"
        >
          <label 
            htmlFor="name"
            data-test-id="name-label"
            id="name-label"
            className="input-label"
          >
            Nome: <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            data-test-id="text-input-name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Digite seu nome"
            aria-describedby="name-description name-error"
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-errormessage={errors.name ? 'name-error' : undefined}
            autoComplete="name"
            spellCheck="true"
            className={errors.name ? 'input-error' : ''}
            maxLength="50"
          />
          <div 
            id="name-description" 
            className="input-description"
            aria-hidden="false"
          >
            Campo obrigatório. Digite seu nome completo (mínimo 2 caracteres).
          </div>
          {errors.name && (
            <div 
              id="name-error" 
              className="error-message"
              role="alert"
              aria-live="polite"
              data-test-id="name-error-message"
            >
              {errors.name}
            </div>
          )}
        </div>

        {/* Email Input */}
        <div 
          className="input-group"
          data-test-id="email-input-group"
          id="email-group"
          role="group"
          aria-labelledby="email-label"
        >
          <label 
            htmlFor="email"
            data-test-id="email-label"
            id="email-label"
            className="input-label"
          >
            Email: <span aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            data-test-id="email-input"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Digite seu email"
            aria-describedby="email-description email-error"
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-errormessage={errors.email ? 'email-error' : undefined}
            autoComplete="email"
            spellCheck="false"
            className={errors.email ? 'input-error' : ''}
            maxLength="100"
            inputMode="email"
          />
          <div 
            id="email-description" 
            className="input-description"
            aria-hidden="false"
          >
            Campo obrigatório. Digite um endereço de email válido.
          </div>
          {errors.email && (
            <div 
              id="email-error" 
              className="error-message"
              role="alert"
              aria-live="polite"
              data-test-id="email-error-message"
            >
              {errors.email}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <div 
          className="input-group"
          data-test-id="phone-input-group"
          id="phone-group"
          role="group"
          aria-labelledby="phone-label"
        >
          <label 
            htmlFor="phone"
            data-test-id="phone-label"
            id="phone-label"
            className="input-label"
          >
            Telefone: <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            data-test-id="tel-input-phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            placeholder="(00) 00000-0000"
            aria-describedby="phone-description phone-error"
            aria-required="true"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-errormessage={errors.phone ? 'phone-error' : undefined}
            autoComplete="tel"
            inputMode="numeric"
            maxLength="11"
            pattern="[0-9]*"
            title="Digite apenas números (máximo 11 dígitos)"
            className={errors.phone ? 'input-error' : ''}
            role="textbox"
            aria-label="Número de telefone brasileiro"
          />
          <div 
            id="phone-description" 
            className="input-description"
            aria-hidden="false"
          >
            Campo obrigatório. Apenas números • {formData.phone.length}/11 dígitos • Mínimo 10 dígitos
          </div>
          {errors.phone && (
            <div 
              id="phone-error" 
              className="error-message"
              role="alert"
              aria-live="polite"
              data-test-id="phone-error-message"
            >
              {errors.phone}
            </div>
          )}
        </div>

        {/* Number Input */}
        <div 
          className="input-group"
          data-test-id="number-input-group"
          id="number-group"
          role="group"
          aria-labelledby="number-label"
        >
          <label 
            htmlFor="number"
            data-test-id="number-label"
            id="number-label"
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
            onBlur={handleBlur}
            placeholder="Digite um número"
            aria-describedby="number-description number-error"
            aria-required="false"
            aria-invalid={errors.number ? 'true' : 'false'}
            aria-errormessage={errors.number ? 'number-error' : undefined}
            min="0"
            step="1"
            className={errors.number ? 'input-error' : ''}
            role="spinbutton"
            aria-label="Campo numérico opcional"
            inputMode="numeric"
          />
          <div 
            id="number-description" 
            className="input-description"
            aria-hidden="false"
          >
            Campo opcional. Digite um número positivo (maior ou igual a zero).
          </div>
          {errors.number && (
            <div 
              id="number-error" 
              className="error-message"
              role="alert"
              aria-live="polite"
              data-test-id="number-error-message"
            >
              {errors.number}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div 
          className="input-group"
          data-test-id="search-input-group"
          id="search-group"
          role="search"
          aria-labelledby="search-label"
        >
          <label 
            htmlFor="search"
            data-test-id="search-label"
            id="search-label"
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
            onBlur={handleBlur}
            placeholder="Pesquisar..."
            aria-describedby="search-description"
            aria-required="false"
            role="searchbox"
            aria-label="Campo de pesquisa"
            spellCheck="true"
            autoComplete="off"
            maxLength="200"
          />
          <div 
            id="search-description" 
            className="input-description"
            aria-hidden="false"
          >
            Campo opcional para pesquisa. Digite termos para buscar informações.
          </div>
        </div>

        {/* Date Input */}
        <div 
          className="input-group"
          data-test-id="date-input-group"
          id="date-group"
          role="group"
          aria-labelledby="date-label"
        >
          <label 
            htmlFor="date"
            data-test-id="date-label"
            id="date-label"
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
            onBlur={handleBlur}
            aria-describedby="date-description"
            aria-required="false"
            aria-label="Seletor de data"
            max="2030-12-31"
            min="1900-01-01"
            role="textbox"
            className=""
          />
          <div 
            id="date-description" 
            className="input-description"
            aria-hidden="false"
          >
            Campo opcional. Selecione uma data entre 1900 e 2030.
          </div>
        </div>

        <button 
          type="submit" 
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Enviar dados do formulário"
          aria-describedby="submit-description"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
        
        <div 
          id="submit-description" 
          className="sr-only"
          aria-hidden="false"
        >
          Clique para enviar o formulário. Os campos obrigatórios devem estar preenchidos corretamente.
        </div>
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
