import React, { useState } from 'react';
import './TextArea.css';
import FormSubmitOverlay from '../components/FormSubmitOverlay';

export default function TextArea() {
  const [formData, setFormData] = useState({
    basicTextarea: '',
    descriptionTextarea: '',
    commentTextarea: '',
    messageTextarea: ''
  });
  const [showOverlay, setShowOverlay] = useState(false);

  const handleTextareaChange = (e) => {
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
      id="textarea-page"
      data-test-id="textarea-page-content"
    >
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Text Area Fields
      </h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="textarea-form"
        id="textarea-form"
        data-test-id="textarea-form"
        aria-label="Text area fields demonstration form"
      >
        {/* Basic Textarea */}
        <div 
          className="textarea-group"
          data-test-id="basic-textarea-group"
          id="basic-textarea-group"
        >
          <label 
            htmlFor="basicTextarea"
            data-test-id="basic-textarea-label"
            className="textarea-label"
          >
            Texto Básico:
          </label>
          <textarea
            id="basicTextarea"
            name="basicTextarea"
            data-test-id="basic-textarea"
            value={formData.basicTextarea}
            onChange={handleTextareaChange}
            placeholder="Ques ques se não ques fala..."
            aria-describedby="basic-textarea-description"
            rows="3"
            cols="50"
          />
          <small 
            id="basic-textarea-description" 
            className="textarea-description"
          >
            Campo de texto livre para qualquer conteúdo
          </small>
        </div>

        {/* Description Textarea with Character Count */}
        <div 
          className="textarea-group"
          data-test-id="description-textarea-group"
          id="description-textarea-group"
        >
          <label 
            htmlFor="descriptionTextarea"
            data-test-id="description-textarea-label"
            className="textarea-label"
          >
            Descrição (máx. 200 caracteres):
          </label>
          <textarea
            id="descriptionTextarea"
            name="descriptionTextarea"
            data-test-id="description-textarea"
            value={formData.descriptionTextarea}
            onChange={handleTextareaChange}
            placeholder="Diz a lenda que na tapera há um portal que levas as pessoas para..."
            aria-describedby="description-textarea-description"
            maxLength="200"
            rows="4"
            cols="50"
          />
          <small 
            id="description-textarea-description" 
            className="textarea-description"
          >
            {formData.descriptionTextarea.length}/200 caracteres
          </small>
        </div>

        {/* Comment Textarea */}
        <div 
          className="textarea-group"
          data-test-id="comment-textarea-group"
          id="comment-textarea-group"
        >
          <label 
            htmlFor="commentTextarea"
            data-test-id="comment-textarea-label"
            className="textarea-label"
          >
            Comentários:
          </label>
          <textarea
            id="commentTextarea"
            name="commentTextarea"
            data-test-id="comment-textarea"
            value={formData.commentTextarea}
            onChange={handleTextareaChange}
            placeholder="Só seguir toda vida reto..."
            aria-describedby="comment-textarea-description"
            rows="5"
            cols="50"
            required
            aria-required="true"
          />
          <small 
            id="comment-textarea-description" 
            className="textarea-description"
          >
            Campo obrigatório para comentários
          </small>
        </div>

        {/* Message Textarea with Custom Styling */}
        <div 
          className="textarea-group"
          data-test-id="message-textarea-group"
          id="message-textarea-group"
        >
          <label 
            htmlFor="messageTextarea"
            data-test-id="message-textarea-label"
            className="textarea-label"
          >
            Mensagem Especial:
          </label>
          <textarea
            id="messageTextarea"
            name="messageTextarea"
            data-test-id="message-textarea"
            value={formData.messageTextarea}
            onChange={handleTextareaChange}
            placeholder="Quer me enrolar me dá uma bala ixtepô..."
            aria-describedby="message-textarea-description"
            className="special-textarea"
            rows="6"
            cols="50"
            spellCheck="true"
          />
          <small 
            id="message-textarea-description" 
            className="textarea-description"
          >
            Area de texto com verificação ortográfica ativada
          </small>
        </div>

        <button 
          type="submit" 
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Submit textarea form data"
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
