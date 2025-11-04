import React, { useState } from 'react';
import './Tables.css';

export default function Tables() {
  // STEP 1: INITIAL DATA - This creates the 4 pre-registered users that will always be there when page reloads
  const initialTableData = [
    {
      id: 1, // Unique identifier for each row - helps React track changes efficiently
      nome: 'Cierra',
      sobrenome: 'Vega',
      idade: 39,
      email: 'cierra@example.com',
      departamento: 'Insurance'
    },
    {
      id: 2,
      nome: 'Alden',
      sobrenome: 'Cantrell',
      idade: 45,
      email: 'alden@example.com',
      departamento: 'Compliance'
    },
    {
      id: 3,
      nome: 'Kierra',
      sobrenome: 'Gentry',
      idade: 29,
      email: 'kierra@example.com',
      departamento: 'Legal'
    },
    {
      id: 4,
      nome: 'Thomas',
      sobrenome: 'Crane',
      idade: 35,
      email: 'thomas@example.com',
      departamento: 'Engineering'
    }
  ];

  // STEP 2: STATE MANAGEMENT - These are React hooks that manage the component's data and behavior
  
  // tableData: holds all the table rows - starts with our 4 pre-registered users
  // setTableData: function to update the table data
  const [tableData, setTableData] = useState(initialTableData);
  
  // editingId: keeps track of which row is currently being edited (null means no row is being edited)
  // setEditingId: function to set which row is being edited
  const [editingId, setEditingId] = useState(null);
  
  // editFormData: holds the temporary data while a row is being edited
  // setEditFormData: function to update the edit form data
  const [editFormData, setEditFormData] = useState({
    nome: '',
    sobrenome: '',
    idade: '',
    email: '',
    departamento: ''
  });

  // showConfirmDelete: tracks which row is showing a delete confirmation
  // setShowConfirmDelete: function to show/hide delete confirmation
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  // STEP 3: EDIT FUNCTIONALITY - Functions that handle editing table rows

  // This function starts the editing process for a specific row
  const handleEditClick = (rowData) => {
    setEditingId(rowData.id); // Set which row is being edited
    setEditFormData({ // Copy the current row data to the edit form
      nome: rowData.nome,
      sobrenome: rowData.sobrenome,
      idade: rowData.idade,
      email: rowData.email,
      departamento: rowData.departamento
    });
  };

  // This function handles changes to the edit form inputs
  const handleEditFormChange = (e) => {
    const { name, value } = e.target; // Get the field name and new value
    setEditFormData(prevState => ({
      ...prevState, // Keep all existing data
      [name]: value // Update only the field that changed
    }));
  };

  // This function saves the edited data back to the table
  const handleSaveClick = () => {
    // Create a new copy of the table data with the updated row
    setTableData(prevData => 
      prevData.map(row => 
        row.id === editingId // Find the row being edited
          ? { ...row, ...editFormData } // Replace it with the edited data
          : row // Keep other rows unchanged
      )
    );
    setEditingId(null); // Exit edit mode
  };

  // This function cancels editing and discards changes
  const handleCancelClick = () => {
    setEditingId(null); // Exit edit mode
    setEditFormData({ // Reset the edit form
      nome: '',
      sobrenome: '',
      idade: '',
      email: '',
      departamento: ''
    });
  };

  // STEP 4: DELETE FUNCTIONALITY - Functions that handle deleting table rows

  // This function shows the delete confirmation dialog
  const handleDeleteClick = (id) => {
    setShowConfirmDelete(id); // Show confirmation for this specific row
  };

  // This function actually deletes the row after confirmation
  const handleConfirmDelete = (id) => {
    setTableData(prevData => 
      prevData.filter(row => row.id !== id) // Remove the row with this ID
    );
    setShowConfirmDelete(null); // Hide the confirmation dialog
  };

  // This function cancels the delete operation
  const handleCancelDelete = () => {
    setShowConfirmDelete(null); // Hide the confirmation dialog
  };

  // STEP 5: COMPONENT RENDER - This is what actually gets displayed on the page
  return (
    <div 
      className="page-content"
      id="tables-page"
      data-test-id="tables-page-content"
    >
      {/* Page Title */}
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Tables
      </h1>

      {/* Instructions for QA Engineers */}
      <div className="page-description">
        <p>Esta página contém uma tabela interativa para automação de testes. 
        Você pode editar e excluir registros. Os dados serão redefinidos ao recarregar a página.</p>
      </div>

      {/* Main Table Container */}
      <div className="table-container">
        <table 
          className="data-table"
          data-test-id="employee-table"
          role="table"
          aria-label="Tabela de funcionários com opções de edição e exclusão"
        >
          {/* Table Header */}
          <thead>
            <tr role="row">
              <th scope="col" data-test-id="header-nome">Nome</th>
              <th scope="col" data-test-id="header-sobrenome">Sobrenome</th>
              <th scope="col" data-test-id="header-idade">Idade</th>
              <th scope="col" data-test-id="header-email">Email</th>
              <th scope="col" data-test-id="header-departamento">Departamento</th>
              <th scope="col" data-test-id="header-actions">Ações</th>
            </tr>
          </thead>

          {/* Table Body - This renders all the table rows */}
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} role="row" data-test-id={`table-row-${row.id}`}>
                {/* Each column is either an editable input (if this row is being edited) or just text */}
                
                {/* Nome Column */}
                <td data-test-id={`nome-cell-${row.id}`}>
                  {editingId === row.id ? (
                    <input
                      type="text"
                      name="nome"
                      value={editFormData.nome}
                      onChange={handleEditFormChange}
                      data-test-id={`edit-nome-input-${row.id}`}
                      className="edit-input"
                      aria-label="Editar nome"
                    />
                  ) : (
                    <span data-test-id={`nome-value-${row.id}`}>{row.nome}</span>
                  )}
                </td>

                {/* Sobrenome Column */}
                <td data-test-id={`sobrenome-cell-${row.id}`}>
                  {editingId === row.id ? (
                    <input
                      type="text"
                      name="sobrenome"
                      value={editFormData.sobrenome}
                      onChange={handleEditFormChange}
                      data-test-id={`edit-sobrenome-input-${row.id}`}
                      className="edit-input"
                      aria-label="Editar sobrenome"
                    />
                  ) : (
                    <span data-test-id={`sobrenome-value-${row.id}`}>{row.sobrenome}</span>
                  )}
                </td>

                {/* Idade Column */}
                <td data-test-id={`idade-cell-${row.id}`}>
                  {editingId === row.id ? (
                    <input
                      type="number"
                      name="idade"
                      value={editFormData.idade}
                      onChange={handleEditFormChange}
                      data-test-id={`edit-idade-input-${row.id}`}
                      className="edit-input"
                      aria-label="Editar idade"
                      min="18"
                      max="100"
                    />
                  ) : (
                    <span data-test-id={`idade-value-${row.id}`}>{row.idade}</span>
                  )}
                </td>

                {/* Email Column */}
                <td data-test-id={`email-cell-${row.id}`}>
                  {editingId === row.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                      data-test-id={`edit-email-input-${row.id}`}
                      className="edit-input"
                      aria-label="Editar email"
                    />
                  ) : (
                    <span data-test-id={`email-value-${row.id}`}>{row.email}</span>
                  )}
                </td>

                {/* Departamento Column */}
                <td data-test-id={`departamento-cell-${row.id}`}>
                  {editingId === row.id ? (
                    <select
                      name="departamento"
                      value={editFormData.departamento}
                      onChange={handleEditFormChange}
                      data-test-id={`edit-departamento-select-${row.id}`}
                      className="edit-select"
                      aria-label="Editar departamento"
                    >
                      <option value="Insurance">Insurance</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Legal">Legal</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">HR</option>
                    </select>
                  ) : (
                    <span data-test-id={`departamento-value-${row.id}`}>{row.departamento}</span>
                  )}
                </td>

                {/* Actions Column - Contains Edit/Save/Cancel and Delete buttons */}
                <td className="actions-cell" data-test-id={`actions-cell-${row.id}`}>
                  {editingId === row.id ? (
                    // Show Save and Cancel buttons when editing
                    <div className="edit-actions">
                      <button
                        onClick={handleSaveClick}
                        className="save-button"
                        data-test-id={`save-button-${row.id}`}
                        aria-label="Salvar alterações"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="cancel-button"
                        data-test-id={`cancel-button-${row.id}`}
                        aria-label="Cancelar edição"
                      >
                        ✗
                      </button>
                    </div>
                  ) : (
                    // Show Edit and Delete buttons when not editing
                    <div className="row-actions">
                      <button
                        onClick={() => handleEditClick(row)}
                        className="edit-button"
                        data-test-id={`edit-button-${row.id}`}
                        aria-label={`Editar ${row.nome} ${row.sobrenome}`}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteClick(row.id)}
                        className="delete-button"
                        data-test-id={`delete-button-${row.id}`}
                        aria-label={`Excluir ${row.nome} ${row.sobrenome}`}
                      >
                        🗑️
                      </button>
                    </div>
                  )}

                  {/* Delete Confirmation Dialog */}
                  {showConfirmDelete === row.id && (
                    <div 
                      className="delete-confirmation"
                      data-test-id={`delete-confirmation-${row.id}`}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby={`delete-title-${row.id}`}
                    >
                      <p id={`delete-title-${row.id}`}>
                        Excluir {row.nome} {row.sobrenome}?
                      </p>
                      <div className="confirmation-actions">
                        <button
                          onClick={() => handleConfirmDelete(row.id)}
                          className="confirm-delete-button"
                          data-test-id={`confirm-delete-${row.id}`}
                          aria-label="Confirmar exclusão"
                        >
                          Sim
                        </button>
                        <button
                          onClick={handleCancelDelete}
                          className="cancel-delete-button"
                          data-test-id={`cancel-delete-${row.id}`}
                          aria-label="Cancelar exclusão"
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State - Shows when no data is available */}
        {tableData.length === 0 && (
          <div 
            className="empty-state"
            data-test-id="empty-state"
            role="status"
            aria-live="polite"
          >
            <p>Nenhum registro encontrado. Recarregue a página para restaurar os dados iniciais.</p>
          </div>
        )}
      </div>
    </div>
  );
}