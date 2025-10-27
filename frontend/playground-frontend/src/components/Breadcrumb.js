import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

export default function Breadcrumb({ tabIndex }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Don't show breadcrumb on playground or login pages
  if (location.pathname === '/playground' || location.pathname === '/login' || location.pathname === '/') {
    return null;
  }

  const getPageName = (path) => {
    switch(path) {
      case 'playground':
        return 'Playground';
      case 'inputs':
        return 'Input Fields';
      case 'textarea':
        return 'Text Area';
      case 'checkboxes':
        return 'Checkboxes';
      case 'radios':
        return 'Radio Buttons';
      case 'selects':
        return 'Selects';
      case 'upload':
        return 'File Uploads';
      case 'upload':
        return 'File Uploads';
      case 'upload':
        return 'File Uploads';
      case 'tags':
        return 'Tags';
      case 'datepicker':
        return 'Date Picker';
      case 'tables':
        return 'Tables';
      case 'cep':
        return 'CEP';
      case 'browser-commands':
        return 'Browser Commands';
      case 'cli-commands':
        return 'CLI Commands';
      default:
        return path;
    }
  };

  const isHelpSubpage = (path) => {
    return path === 'browser-commands' || path === 'cli-commands';
  };

  const currentPath = pathSegments[pathSegments.length - 1];
  const showAjudaInBreadcrumb = isHelpSubpage(currentPath);

  return (
    <div 
      className="breadcrumb" 
      id="breadcrumb-navigation"
      data-test-id="breadcrumb"
      role="navigation"
      aria-label="Breadcrumb navigation"
    >
      <Link 
        to="/playground"
        id="breadcrumb-home-link"
        data-test-id="breadcrumb-home"
        className="breadcrumb-link"
        tabIndex={tabIndex}
      >
        Playground
      </Link>

      {showAjudaInBreadcrumb && (
        <>
          <span
            className="separator"
            data-test-id="breadcrumb-separator"
            aria-hidden="true"
        >
          /
          </span>
          <Link
            to="/ajuda"
            className="breadcrumb-link"
            data-test-id="breadcrumb-ajuda"
            tabIndex={tabIndex}
          >
            Ajuda
          </Link>
        </>
      )}

      {pathSegments.length > 0 && (
        <>
          <span 
            className="separator"
            data-test-id="breadcrumb-separator"
            aria-hidden="true"
          >
            /
          </span>
          <span 
            className="breadcrumb-current"
            data-test-id="breadcrumb-current-page"
            aria-current="page"
          >
            {getPageName(pathSegments[pathSegments.length - 1])}
          </span>
        </>
      )}
    </div>
  );
}
