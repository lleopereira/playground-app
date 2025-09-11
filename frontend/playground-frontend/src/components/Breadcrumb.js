import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

export default function Breadcrumb() {
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
    <div className="breadcrumb">
      <Link to="/playground">Playground</Link>
      {pathSegments.length > 0 && (
        <>
          <span className="separator">/</span>
          <span>{getPageName(pathSegments[pathSegments.length - 1])}</span>
        </>
      )}
    </div>
  );
}
