import React, { useState } from 'react'
import './BrowserCommands.css'
import CommandModal from '../components/CommandModal'

export default function BrowserCommands() {
  const [selectedCommand, setSelectedCommand] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Browser Library commands data
  const browserCommands = {
    navigation: {
      title: "Navegação",
      color: "#4a90e2",
      commands: [
        {
          id: "new-browser",
          name: "New Browser",
          category: "navigation",
          description: "Abre uma nova instância do navegador",
          syntax: "New Browser    browser=chromium    headless=False",
          example: `*** Test Cases ***
Open Browser Example
    New Browser    browser=chromium    headless=False
    New Page       https://example.com`,
          parameters: [
            { name: "browser", type: "string", description: "Tipo do navegador (chromium, firefox, webkit)", required: false, default: "chromium" },
            { name: "headless", type: "boolean", description: "Executar em modo headless", required: false, default: "True" }
          ],
          notes: "Comando base para inicializar uma nova instância do navegador. Suporta Chromium, Firefox e WebKit."
        },
        {
          id: "new-page",
          name: "New Page",
          category: "navigation",
          description: "Abre uma nova página/aba no navegador",
          syntax: "New Page    url",
          example: `*** Test Cases ***
Navigate To Page
    New Browser
    New Page    https://robotframework.org
    Get Title    should be    Robot Framework`,
          parameters: [
            { name: "url", type: "string", description: "URL da página a ser aberta", required: true }
          ],
          notes: "Abre uma nova aba e navega para a URL especificada. A página se torna o contexto ativo."
        },
        {
          id: "go-to",
          name: "Go To",
          category: "navigation",
          description: "Navega para uma URL na página atual",
          syntax: "Go To    url",
          example: `*** Test Cases ***
Navigate To URL
    New Browser
    New Page    https://example.com
    Go To    https://google.com`,
          parameters: [
            { name: "url", type: "string", description: "URL para navegar", required: true }
          ],
          notes: "Usa a aba/página atual em vez de abrir uma nova."
        },
        {
          id: "go-back",
          name: "Go Back",
          category: "navigation",
          description: "Volta para a página anterior no histórico",
          syntax: "Go Back",
          example: `*** Test Cases ***
Navigate Back
    New Browser
    New Page    https://example.com
    Go To    https://google.com
    Go Back`,
          parameters: [],
          notes: "Equivale ao botão 'Voltar' do navegador."
        },
        {
          id: "reload",
          name: "Reload",
          category: "navigation",
          description: "Recarrega a página atual",
          syntax: "Reload",
          example: `*** Test Cases ***
Refresh Page
    New Browser
    New Page    https://example.com
    Reload`,
          parameters: [],
          notes: "Equivale ao F5 ou Ctrl+R do navegador."
        },
        {
          id: "close-page",
          name: "Close Page",
          category: "navigation",
          description: "Fecha a página/aba atual",
          syntax: "Close Page",
          example: `*** Test Cases ***
Close Tab
    New Browser
    New Page    https://example.com
    Close Page`,
          parameters: [],
          notes: "Se for a última aba, o navegador permanece aberto."
        }
      ]
    },
    
    locators: {
      title: "Localizadores",
      color: "#f39c12",
      commands: [
        {
          id: "click",
          name: "Click",
          category: "locators",
          description: "Clica em um elemento da página",
          syntax: "Click    selector    button=left    clickCount=1",
          example: `*** Test Cases ***
Click Button Example
    New Browser
    New Page    https://example.com
    Click    id=submit-button
    Click    text="Clique aqui"    button=right`,
          parameters: [
            { name: "selector", type: "string", description: "Seletor CSS, XPath ou texto do elemento", required: true },
            { name: "button", type: "string", description: "Botão do mouse (left, right, middle)", required: false, default: "left" },
            { name: "clickCount", type: "number", description: "Número de cliques", required: false, default: "1" }
          ],
          notes: "Suporta seletores CSS, XPath, texto e role-based locators. Aguarda automaticamente o elemento ficar visível."
        },
        {
          id: "fill-text",
          name: "Fill Text",
          category: "locators",
          description: "Preenche um campo de texto",
          syntax: "Fill Text    selector    text",
          example: `*** Test Cases ***
Fill Form Example
    New Browser
    New Page    https://example.com/form
    Fill Text    id=username    meu_usuario
    Fill Text    css=[name="password"]    minha_senha`,
          parameters: [
            { name: "selector", type: "string", description: "Seletor do campo de texto", required: true },
            { name: "text", type: "string", description: "Texto a ser inserido", required: true }
          ],
          notes: "Limpa o campo antes de inserir o novo texto. Funciona com input, textarea e elementos contenteditable."
        },
        {
          id: "get-text",
          name: "Get Text",
          category: "locators",
          description: "Obtém o texto de um elemento",
          syntax: "Get Text    selector",
          example: `*** Test Cases ***
Get Element Text
    New Browser
    New Page    https://example.com
    \${text}=    Get Text    css=.message
    Log    Texto obtido: \${text}`,
          parameters: [
            { name: "selector", type: "string", description: "Seletor do elemento", required: true }
          ],
          notes: "Retorna o texto visível do elemento, excluindo elementos filhos ocultos."
        },
        {
          id: "hover",
          name: "Hover",
          category: "locators",
          description: "Move o mouse sobre um elemento",
          syntax: "Hover    selector",
          example: `*** Test Cases ***
Hover Menu Example
    New Browser
    New Page    https://example.com
    Hover    css=.menu-item
    Click    css=.submenu-option`,
          parameters: [
            { name: "selector", type: "string", description: "Seletor do elemento", required: true }
          ],
          notes: "Útil para revelar menus dropdown ou tooltips que aparecem no hover."
        }
      ]
    },

    assertions: {
      title: "Verificações",
      color: "#27ae60",
      commands: [
        {
          id: "get-title",
          name: "Get Title",
          category: "assertions",
          description: "Obtém o título da página atual",
          syntax: "Get Title    assertion_operator=equal    assertion_expected=None",
          example: `*** Test Cases ***
Verify Page Title
    New Browser
    New Page    https://robotframework.org
    Get Title    ==    Robot Framework
    \${title}=    Get Title
    Log    Page title is: \${title}`,
          parameters: [
            { name: "assertion_operator", type: "string", description: "Operador de comparação (==, !=, contains, etc.)", required: false },
            { name: "assertion_expected", type: "string", description: "Valor esperado para comparação", required: false }
          ],
          notes: "Pode ser usado para verificação direta ou para capturar o título em uma variável."
        },
        {
          id: "get-url",
          name: "Get Url",
          category: "assertions",
          description: "Obtém a URL atual da página",
          syntax: "Get Url",
          example: `*** Test Cases ***
Check Current URL
    New Browser
    New Page    https://robotframework.org
    \${current_url}=    Get Url
    Should Contain    \${current_url}    robotframework`,
          parameters: [],
          notes: "Útil para verificar redirecionamentos ou confirmar a página atual."
        },
        {
          id: "get-element-count",
          name: "Get Element Count",
          category: "assertions",
          description: "Conta o número de elementos que correspondem ao seletor",
          syntax: "Get Element Count    selector",
          example: `*** Test Cases ***
Count List Items
    New Browser
    New Page    https://example.com
    \${count}=    Get Element Count    css=.list-item
    Should Be Equal As Numbers    \${count}    5`,
          parameters: [
            { name: "selector", type: "string", description: "Seletor dos elementos a serem contados", required: true }
          ],
          notes: "Retorna 0 se nenhum elemento for encontrado."
        },
        {
          id: "wait-for-elements-state",
          name: "Wait For Elements State",
          category: "assertions",
          description: "Aguarda elementos atingirem um estado específico",
          syntax: "Wait For Elements State    selector    state    timeout=10s",
          example: `*** Test Cases ***
Wait For Button
    New Browser
    New Page    https://example.com
    Wait For Elements State    id=submit-btn    visible    timeout=5s
    Click    id=submit-btn`,
          parameters: [
            { name: "selector", type: "string", description: "Seletor dos elementos", required: true },
            { name: "state", type: "string", description: "Estado esperado (visible, hidden, enabled, disabled)", required: true },
            { name: "timeout", type: "string", description: "Tempo limite de espera", required: false, default: "10s" }
          ],
          notes: "Estados disponíveis: visible, hidden, enabled, disabled, selected, deselected."
        }
      ]
    }
  }

  // Get all commands for filtering
  const getAllCommands = () => {
    const allCommands = []
    Object.values(browserCommands).forEach(category => {
      allCommands.push(...category.commands)
    })
    return allCommands
  }

  // Filter commands based on search and category
  const getFilteredCommands = () => {
    let commands = getAllCommands()
    
    if (selectedCategory !== 'all') {
      commands = commands.filter(cmd => cmd.category === selectedCategory)
    }
    
    if (searchTerm) {
      commands = commands.filter(cmd => 
        cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return commands
  }

  // Handle command click
  const handleCommandClick = (command) => {
    setSelectedCommand(command)
  }

  // Close modal
  const closeModal = () => {
    setSelectedCommand(null)
  }

  // Get category color
  const getCategoryColor = (categoryKey) => {
    return browserCommands[categoryKey]?.color || '#666'
  }

  return (
    <div 
      className="page-content"
      id="browser-commands-page"
      data-test-id="browser-commands-page-content"
    >
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Target Commands
      </h1>
      
      <p className="page-description" data-test-id="page-description">
        Local para verificar os comandos da biblioteca browser. Clique em qualquer comando para ver detalhes completos, sintaxe e exemplos práticos.
      </p>

      {/* Search and Filter Controls */}
      <div className="controls-section" data-test-id="controls-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar comandos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            data-test-id="search-input"
            aria-label="Buscar comandos"
          />
        </div>
        
        <div className="filter-container">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
            data-test-id="category-filter"
            aria-label="Filtrar por categoria"
          >
            <option value="all">Todas as Categorias</option>
            {Object.entries(browserCommands).map(([key, category]) => (
              <option key={key} value={key}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="categories-overview" data-test-id="categories-overview">
        <h2 className="section-title">Categorias de Comandos</h2>
        <div className="categories-grid">
          {Object.entries(browserCommands).map(([key, category]) => (
            <div 
              key={key}
              className="category-card"
              style={{ borderColor: category.color }}
              data-test-id={`category-card-${key}`}
            >
              <div 
                className="category-header"
                style={{ backgroundColor: category.color }}
              >
                <h3 className="category-title">{category.title}</h3>
                <span className="command-count">
                  {category.commands.length} comando{category.commands.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="category-commands-preview">
                {category.commands.slice(0, 3).map(command => (
                  <span key={command.id} className="command-preview">
                    {command.name}
                  </span>
                ))}
                {category.commands.length > 3 && (
                  <span className="more-commands">
                    +{category.commands.length - 3} mais
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commands Grid */}
      <div className="commands-section" data-test-id="commands-section">
        <h2 className="section-title">
          Comandos Disponíveis
          <span className="commands-count">
            ({getFilteredCommands().length} comando{getFilteredCommands().length !== 1 ? 's' : ''})
          </span>
        </h2>
        
        <div className="commands-grid" data-test-id="commands-grid">
          {getFilteredCommands().map((command, index) => (
            <button
              key={command.id}
              onClick={() => handleCommandClick(command)}
              className="command-card"
              style={{ borderLeftColor: getCategoryColor(command.category) }}
              data-test-id={`command-card-${command.id}`}
              data-number={index + 1}
              aria-label={`Ver detalhes do comando ${command.name}`}
            >
              <div className="command-header">
                <h3 className="command-name">{command.name}</h3>
                <span 
                  className="command-category"
                  style={{ backgroundColor: getCategoryColor(command.category) }}
                >
                  {browserCommands[command.category]?.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {getFilteredCommands().length === 0 && (
          <div className="no-results" data-test-id="no-results">
            <p>Nenhum comando encontrado para os filtros selecionados.</p>
          </div>
        )}
      </div>

      {/* Command Details Modal */}
      <CommandModal 
        command={selectedCommand}
        isOpen={!!selectedCommand}
        onClose={closeModal}
      />
    </div>
  )
}
