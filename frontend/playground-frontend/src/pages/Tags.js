import React, { useState } from 'react';
import './Tags.css';
import FormSubmitOverlay from '../components/FormSubmitOverlay';

export default function Tags() {
  // State Management
  // tags: Array to store all created tags
  // inputValue: Current value in the input field
  // showOverlay: Boolean to control form submission overlay display
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

  // Event Handler Functions

  /**
   * handleInputChange - Updates the input field value as user types
   * @param {Event} e - The input change event
   * This function uses the event target's value to update our inputValue state
   */
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  /**
   * handleKeyPress - Detects when user presses Enter key to create a tag
   * @param {Event} e - The keyboard event
   * Logic:
   * 1. Check if pressed key is 'Enter'
   * 2. Prevent default form submission behavior
   * 3. Trim whitespace from input value
   * 4. Validate that tag is not empty and doesn't already exist
   * 5. Add new tag to tags array
   * 6. Clear the input field
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      const trimmedValue = inputValue.trim(); // Remove leading/trailing spaces
      
      // Validation: Only add if tag has content and doesn't already exist
      if (trimmedValue && !tags.includes(trimmedValue)) {
        // Using functional update to ensure we get the latest state
        setTags(prevTags => [...prevTags, trimmedValue]);
        setInputValue(''); // Clear input field
      }
    }
  };

  /**
   * removeTag - Removes a specific tag from the tags array
   * @param {string} tagToRemove - The tag text to be removed
   * Uses filter method to create new array without the specified tag
   */
  const removeTag = (tagToRemove) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  /**
   * handleSubmit - Handles form submission
   * @param {Event} e - The form submit event
   * Prevents default submission and shows overlay with current tags data
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  // Component Render
  return (
    <div 
      className="page-content"
      id="tags-page"
      data-test-id="tags-page-content"
    >
      {/* Page Title */}
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Tags
      </h1>
      
      {/* Main Form Container */}
      <form 
        onSubmit={handleSubmit} 
        className="tags-form"
        id="tags-form"
        data-test-id="tags-form"
        aria-label="Tags creation form"
      >
        {/* Description Text */}
        <p className="tags-description">
          Adicione tags para organizar suas ideias
        </p>

        {/* Tags Container - Shows existing tags */}
        <div 
          className="tags-container"
          data-test-id="tags-container"
          id="tags-container"
        >
          {/* 
            Conditional Rendering:
            - If tags array has items, map through and render each tag
            - Each tag gets a unique key (the tag text itself)
            - Each tag has a remove button with × symbol
          */}
          {tags.map((tag, index) => (
            <div 
              key={tag} 
              className="tag-item"
              data-test-id={`tag-item-${index}`}
            >
              <span className="tag-text">{tag}</span>
              <button
                type="button"
                className="tag-remove"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
                data-test-id={`remove-tag-${index}`}
              >
                ×
              </button>
            </div>
          ))}
          
          {/* Tag Input Field */}
          <input
            type="text"
            className="tag-input"
            placeholder="Nova tag..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            data-test-id="tag-input-field"
            id="tag-input"
            aria-label="Enter new tag and press Enter to add"
          />
        </div>

        {/* Helper Text */}
        <small className="input-helper">
          Digite uma tag e pressione Enter para adicionar
        </small>

        {/* Submit Button */}
        <button 
          type="submit" 
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Submit tags data"
        >
          Enviar
        </button>
      </form>

      {/* Conditional Overlay Rendering */}
      {/* 
        Shows FormSubmitOverlay when showOverlay is true
        Passes tags data and close handler function
      */}
      {showOverlay && (
        <FormSubmitOverlay 
          formData={{ tags: tags }}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}