import React, { useState, useRef } from 'react'
import './Upload.css'
import FormSubmitOverlay from '../components/FormSubmitOverlay'

export default function Upload() {
    // Refs for file inputs
    const documentInputRef = useRef(null)
    const imageInputRef = useRef(null)

    const [selectedDocument, setSelectedDocument] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
    const [isDragOverDocument, setIsDragOverDocument] = useState(false)
    const [isDragOverImage, setIsDragOverImage] = useState(false)
    const [documentError, setDocumentError] = useState('')
    const [imageError, setImageError] = useState('')
    const [showOverlay, setShowOverlay] = useState(false)
    const documentTypes = ['.pdf', '.txt', '.doc', '.docx', '.rtf']
    const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']

    const validateFileType = (file, allowedTypes) => {
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
        return allowedTypes.includes(fileExtension)
    }

    const validateFileSize = (file, maxSizeMB = 10) => {
        const maxSizeBytes = maxSizeMB * 1024 * 1024
        return file.size <= maxSizeBytes
    }

    const handleDocumentChange = (e) => {
        const file = e.target.files[0]
        handleDocumentFile(file)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        handleImageFile(file)
    }

    const handleDocumentFile = (file) => {
        if (!file) return

        setDocumentError('')

        if (!validateFileType(file, documentTypes)) {
            setDocumentError(`Tipo de arquivo não suportado. Use: ${documentTypes.join(', ')}`)
            return
        }

        if (!validateFileSize(file)) {
            setDocumentError('Arquivo muito grande. Máximo: 10MB')
            return
        }

        setSelectedDocument(file)
    }

    const handleImageFile = (file) => {
        if (!file) return

        setImageError('')
        setImagePreviewUrl(null)

        if (!validateFileType(file, imageTypes)) {
            setImageError(`Tipo de imagem não suportado. Use: ${imageTypes.join(', ')}`)
            return
        }

        if (!validateFileSize(file, 5)) { // 5MB limit for images
            setImageError('Imagem muito grande. Máximo: 5MB')
            return
        }

        setSelectedImage(file)

        const reader = new FileReader()
        reader.onload = (e) => {
            setImagePreviewUrl(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const handleDocumentDragOver = (e) => {
        e.preventDefault()
        setIsDragOverDocument(true)
    }

    const handleDocumentDragLeave = (e) => {
        e.preventDefault()
        setIsDragOverDocument(false)
    }

    const handleDocumentDrop = (e) => {
        e.preventDefault()
        setIsDragOverDocument(false)
        const file = e.dataTransfer.files[0]
        handleDocumentFile(file)
    }

    const handleImageDragOver = (e) => {
        e.preventDefault()
        setIsDragOverImage(true)
    }

    const handleImageDragLeave = (e) => {
        e.preventDefault()
        setIsDragOverImage(false)
    }

    const handleImageDrop = (e) => {
        e.preventDefault()
        setIsDragOverImage(false)
        const file = e.dataTransfer.files[0]
        handleImageFile(file)
    }

    const removeDocument = () => {
        setSelectedDocument(null)
        setDocumentError('')
        // Reset file input to allow selecting the same file again
        if (documentInputRef.current) {
            documentInputRef.current.value = ''
        }
    }

    const removeImage = () => {
        setSelectedImage(null)
        setImageError('')
        setImagePreviewUrl(null)
        // Reset file input to allow selecting the same file again
        if (imageInputRef.current) {
            imageInputRef.current.value = ''
        }
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowOverlay(true)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

    const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase()
    switch (extension) {
        case 'pdf': return '📄'
        case 'txt': return '📝'
        case 'doc': return '🗎'
        case 'docx': return '📘'
        default: return '📎'
        }
    }

        const getFileTypeName = (filename) => {
            const extension = filename.split('.').pop().toLowerCase()
            switch (extension) {
                case 'pdf': return 'PDF Document'
                case 'txt': return 'Text File'
                case 'doc': return 'Word Document'
                case 'docx': return 'Word Document'
                case 'rtf': return 'Rich Text Format'
                default: return 'Document'
        }
    }

    return (
    <div 
      className="page-content"
      id="upload-page"
      data-test-id="upload-page-content"
    >
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Upload
      </h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="upload-form"
        id="upload-form"
        data-test-id="upload-form"
        aria-label="File upload form"
      >
        {/* Document Upload Field */}
        <div className="form-group">
          <label 
            htmlFor="document-upload"
            className="form-label"
            data-test-id="document-upload-label"
          >
            Faça o upload do seu arquivo aqui:
          </label>
          
          <div 
            className={`upload-area ${isDragOverDocument ? 'drag-over' : ''} ${selectedDocument ? 'has-file' : ''}`}
            onDragOver={handleDocumentDragOver}
            onDragLeave={handleDocumentDragLeave}
            onDrop={handleDocumentDrop}
            data-test-id="document-upload-area"
          >
            <input
              type="file"
              id="document-upload"
              name="document"
              accept={documentTypes.join(',')}
              onChange={handleDocumentChange}
              className="file-input"
              data-test-id="document-file-input"
              aria-describedby="document-help document-error"
              ref={documentInputRef}
            />
            
            {!selectedDocument ? (
              <div className="upload-placeholder">
                <div className="upload-icon">📎</div>
                <div className="upload-text">
                  <p className="upload-primary-text">
                    Clique para selecionar ou arraste arquivos aqui
                  </p>
                  <p className="upload-secondary-text">
                    Formatos aceitos: PDF, TXT, DOC, DOCX, RTF (máx. 10MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="file-preview" data-test-id="document-preview">
                <div className="file-info">
                  <span className="file-icon">{getFileIcon(selectedDocument.name)}</span>
                  <div className="file-details">
                    <span className="file-name">{selectedDocument.name}</span>
                    <span className="file-meta">
                      {getFileTypeName(selectedDocument.name)} • {formatFileSize(selectedDocument.size)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeDocument}
                  className="remove-file-btn"
                  data-test-id="remove-document-btn"
                  aria-label={`Remove file ${selectedDocument.name}`}
                >
                  ×
                </button>
              </div>
            )}
          </div>
          
          {documentError && (
            <div 
              className="error-message"
              id="document-error"
              data-test-id="document-error-message"
              role="alert"
            >
              {documentError}
            </div>
          )}
          
          <small 
            id="document-help" 
            className="form-help"
            data-test-id="document-help-text"
          >
            Documentos suportados: PDF, texto e documentos Word
          </small>
        </div>

        {/* Image Upload Field */}
        <div className="form-group">
          <label 
            htmlFor="image-upload"
            className="form-label"
            data-test-id="image-upload-label"
          >
            Faça o upload da sua imagem aqui:
          </label>
          
          <div 
            className={`upload-area image-upload-area ${isDragOverImage ? 'drag-over' : ''} ${selectedImage ? 'has-file' : ''}`}
            onDragOver={handleImageDragOver}
            onDragLeave={handleImageDragLeave}
            onDrop={handleImageDrop}
            data-test-id="image-upload-area"
          >
            <input
              type="file"
              id="image-upload"
              name="image"
              accept={imageTypes.join(',')}
              onChange={handleImageChange}
              className="file-input"
              data-test-id="image-file-input"
              aria-describedby="image-help image-error"
              ref={imageInputRef}
            />
            
            {!selectedImage ? (
              <div className="upload-placeholder">
                <div className="upload-icon">🖼️</div>
                <div className="upload-text">
                  <p className="upload-primary-text">
                    Clique para selecionar ou arraste uma imagem aqui
                  </p>
                  <p className="upload-secondary-text">
                    Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="image-preview-container" data-test-id="image-preview">
                <div className="image-preview">
                  <img 
                    src={imagePreviewUrl} 
                    alt="Preview da imagem selecionada"
                    className="preview-image"
                    data-test-id="preview-image"
                  />
                  <div className="image-overlay">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="remove-image-btn"
                      data-test-id="remove-image-btn"
                      aria-label={`Remove image ${selectedImage.name}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="image-info">
                  <span className="image-name">{selectedImage.name}</span>
                  <span className="image-size">{formatFileSize(selectedImage.size)}</span>
                </div>
              </div>
            )}
          </div>
          
          {imageError && (
            <div 
              className="error-message"
              id="image-error"
              data-test-id="image-error-message"
              role="alert"
            >
              {imageError}
            </div>
          )}
          
          <small 
            id="image-help" 
            className="form-help"
            data-test-id="image-help-text"
          >
            Imagens suportadas: JPG, PNG, GIF e WebP
          </small>
        </div>

        <button 
          type="submit" 
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Submit upload form"
        >
          Enviar
        </button>
      </form>

      {showOverlay && (
        <FormSubmitOverlay 
          formData={{ 
            uploadedDocument: selectedDocument ? selectedDocument.name : null,
            uploadedImage: selectedImage ? selectedImage.name : null
          }}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  )

}