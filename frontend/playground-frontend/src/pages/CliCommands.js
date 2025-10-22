import React, { useState } from 'react';
import './CliCommands.css';

export default function CliCommands() {
  const [searchTerm, setSearchTerm] = useState('');

  // CLI Commands data
  const cliCommands = [
    {
      id: 1,
      category: "Execução Básica",
      command: "robot <file>",
      example: "robot tests/login.robot",
      notes: "Executa um arquivo de suite"
    },
    {
      id: 2,
      category: "Execução Básica",
      command: "robot <folder>",
      example: "robot tests/",
      notes: "Executa recursivamente arquivos .robot"
    },
    {
      id: 3,
      category: "Seleção de Testes",
      command: "--test \"<test name>\"",
      example: "robot --test \"User Can Login\" tests/login.robot",
      notes: "Nome deve corresponder exatamente"
    },
    {
      id: 4,
      category: "Seleção de Testes",
      command: "--suite <suite name>",
      example: "robot --suite login tests/",
      notes: "Suite = nome do arquivo ou diretório"
    },
    {
      id: 5,
      category: "Filtros por Tags",
      command: "--include <tag>",
      example: "robot --include smoke tests/",
      notes: "Executa testes com essa tag"
    },
    {
      id: 6,
      category: "Filtros por Tags",
      command: "--exclude <tag>",
      example: "robot --exclude slow tests/",
      notes: "Pula testes com essa tag"
    },
    {
      id: 7,
      category: "Configurações de Output",
      command: "--output, --log, --report",
      example: "robot --output results/out.xml --log results/log.html --report results/report.html tests/",
      notes: "Útil em CI/CD"
    },
    {
      id: 8,
      category: "Execução Paralela",
      command: "pabot --processes <n>",
      example: "pabot --processes 4 tests/",
      notes: "Requer pabot instalado"
    },
    {
      id: 9,
      category: "Variáveis Browser",
      command: "--variable BROWSER:<value>",
      example: "robot --variable BROWSER:firefox tests/",
      notes: "Valores: chromium, firefox, webkit"
    },
    {
      id: 10,
      category: "Variáveis Browser",
      command: "--variable HEADLESS:False",
      example: "robot --variable HEADLESS:False tests/",
      notes: "Padrão = True (sem interface)"
    },
    {
      id: 11,
      category: "Variáveis Customizadas",
      command: "--variable NAME:value",
      example: "robot --variable ENV:staging --variable USERNAME:admin tests/",
      notes: "Sobrescreve variáveis no .robot"
    },
    {
      id: 12,
      category: "Debugging",
      command: "--dryrun",
      example: "robot --dryrun tests/",
      notes: "Nenhum navegador é aberto"
    },
    {
      id: 13,
      category: "Debugging",
      command: "--loglevel <level>",
      example: "robot --loglevel DEBUG tests/",
      notes: "Níveis: TRACE, DEBUG, INFO, WARN, ERROR"
    },
    {
      id: 14,
      category: "Debugging",
      command: "--listener Browser:DEBUG",
      example: "robot --listener Browser:DEBUG tests/",
      notes: "Abre o Playwright Inspector"
    },
    {
      id: 15,
      category: "Seleção Avançada",
      command: "--test with wildcards",
      example: "robot --test \"*Login*\" tests/",
      notes: "Corresponde a nomes parciais"
    },
    {
      id: 16,
      category: "Combinações",
      command: "(mix flags)",
      example: "pabot --processes 3 --include smoke --variable ENV:qa tests/",
      notes: "Comum em pipelines de CI"
    },
    {
      id: 17,
      category: "Ajuda",
      command: "robot --help",
      example: "robot --help",
      notes: "Mostra todas as flags CLI"
    }
  ];

  // Get unique categories
  const categories = [...new Set(cliCommands.map(cmd => cmd.category))];

  // Filter commands based on search term
  const filteredCommands = cliCommands.filter(cmd =>
    cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.example.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group commands by category
  const groupedCommands = categories.map(category => ({
    category,
    commands: filteredCommands.filter(cmd => cmd.category === category)
  })).filter(group => group.commands.length > 0);

  return (
    <div 
      className="page-content"
      id="cli-commands-page"
      data-test-id="cli-commands-page-content"
      role="main"
    >
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Comandos do Robot Framework
      </h1>
      
      <p className="page-description" data-test-id="page-description">
        Referência completa dos comandos de linha de comando (CLI) do Robot Framework.
      </p>

      {/* Search Input */}
      <div className="search-section" data-test-id="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar comandos, exemplos ou categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            data-test-id="search-input"
            aria-label="Buscar comandos CLI"
          />
        </div>
      </div>

      {/* Commands Table and Mobile Cards */}
      <div className="commands-container" data-test-id="commands-container">
        {groupedCommands.map((group, groupIndex) => (
          <div key={group.category} className="command-group" data-test-id={`command-group-${groupIndex}`}>
            <h2 className="category-title">{group.category}</h2>
            
            {/* Desktop Table */}
            <div className="table-container">
              <table className="commands-table" role="table" aria-label={`Comandos da categoria ${group.category}`}>
                <thead>
                  <tr role="row">
                    <th scope="col" className="table-header command-col">Comando</th>
                    <th scope="col" className="table-header example-col">Exemplo</th>
                    <th scope="col" className="table-header notes-col">Observações</th>
                  </tr>
                </thead>
                <tbody>
                  {group.commands.map((cmd, cmdIndex) => (
                    <tr key={cmd.id} role="row" className="table-row" data-test-id={`command-row-${cmd.id}`}>
                      <td className="table-cell command-cell">
                        <code className="command-code">{cmd.command}</code>
                      </td>
                      <td className="table-cell example-cell">
                        <code className="example-code">{cmd.example}</code>
                      </td>
                      <td className="table-cell notes-cell">
                        {cmd.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="mobile-commands-container">
              {group.commands.map((cmd, cmdIndex) => (
                <div key={cmd.id} className="mobile-command-card" data-test-id={`mobile-command-${cmd.id}`}>
                  <div className="mobile-command-header">
                    <div className="mobile-command-title">Comando</div>
                    <code className="mobile-command-code">{cmd.command}</code>
                  </div>
                  
                  <div className="mobile-example-section">
                    <div className="mobile-example-title">Exemplo</div>
                    <code className="mobile-example-code">{cmd.example}</code>
                  </div>
                  
                  <div className="mobile-notes-section">
                    <div className="mobile-notes-title">Observações</div>
                    <div className="mobile-notes-text">{cmd.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredCommands.length === 0 && (
          <div className="no-results" data-test-id="no-results">
            <p>Nenhum comando encontrado para o termo "{searchTerm}".</p>
            <p>Tente usar palavras-chave diferentes ou limpe o filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
