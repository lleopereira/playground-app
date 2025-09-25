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
      default:
        return path;
    }
  };

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
