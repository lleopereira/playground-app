import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';
import Breadcrumb from './Breadcrumb';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (isSidebarOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          menuButtonRef.current &&
          !menuButtonRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Hide top bar on playground page
  const isPlaygroundPage = location.pathname === '/playground';
  
  // Check if we're on command pages (should have full-width breadcrumb)
  const isCommandPage = ['/cli-commands', '/browser-commands'].includes(location.pathname);
  
  // Check if we're on DatePicker page (for special layout handling)
  const isDatePickerPage = location.pathname === '/datepicker';
  
  // Check if we're on Tags page (for special layout handling)
  const isTagsPage = location.pathname === '/tags';
  
  // Check if we're on Inputs page (for special layout handling)
  const isInputsPage = location.pathname === '/inputs';
  
  // Check if we're on TextArea page (for special layout handling)
  const isTextAreaPage = location.pathname === '/textarea';
  
  // Check if we're on CEP page (for special layout handling)
  const isCEPPage = location.pathname === '/cep';
  
  // Check if we're on Tables page (for special layout handling)
  const isTablesPage = location.pathname === '/tables';

  return (
    <div 
      className={`layout-container ${isSidebarOpen ? 'sidebar-open' : ''}`}
      id="main-layout"
      data-test-id="layout-container"
      data-datepicker-page={isDatePickerPage ? 'true' : undefined}
      data-tags-page={isTagsPage ? 'true' : undefined}
      data-inputs-page={isInputsPage ? 'true' : undefined}
      data-textarea-page={isTextAreaPage ? 'true' : undefined}
      data-cep-page={isCEPPage ? 'true' : undefined}
      data-tables-page={isTablesPage ? 'true' : undefined}
    >
      {/* Top bar - hidden on playground page */}
      {!isPlaygroundPage && (
        <div 
          className={`top-bar ${isCommandPage ? 'full-width' : 'right-corner'}`}
          id="top-navigation-bar"
          data-test-id="top-bar"
          role="banner"
        >
          <Breadcrumb tabIndex="2" />
          <button 
            className="logout-button" 
            onClick={handleLogout}
            data-test-id="logout-button"
            id="logout-btn"
            type="button"
            aria-label="Logout from application"
            tabIndex="3"
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button 
        ref={menuButtonRef}
        className={`menu-toggle ${isSidebarOpen ? 'hidden' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
        data-test-id="hamburger-menu"
        id="mobile-menu-toggle"
        type="button"
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar-navigation"
        tabIndex="0"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        role="navigation"
        data-test-id="sidebar-navigation"
        id="sidebar-navigation"
        aria-label="Main navigation"
      >
        <h3 
          id="sidebar-title" 
          data-test-id="sidebar-title-heading"
          className="sidebar-title"
        >
          <Link 
            to="/playground" 
            className="sidebar-title-link" 
            onClick={closeSidebar}
            data-test-id="sidebar-home-link"
            id="sidebar-playground-link"
            aria-label="Go to Playground home"
            tabIndex="1"
          >
            Playground
          </Link>
        </h3>
        <ul 
          className="sidebar-menu"
          data-test-id="sidebar-menu"
          id="navigation-menu"
          role="menu"
        >
          <li role="menuitem">
            <Link
              to="/inputs"
              id="link-input-fields"
              data-test-id="nav-input-fields"
              className={location.pathname === '/inputs' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/inputs' ? 'page' : undefined}
            >
              Input Fields
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/textarea"
              id="link-textarea"
              data-test-id="nav-textarea"
              className={location.pathname === '/textarea' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/textarea' ? 'page' : undefined}
            >
              Text Area
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/checkboxes"
              id="link-checkbox"
              data-test-id="nav-checkboxes"
              className={location.pathname === '/checkboxes' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/checkboxes' ? 'page' : undefined}
            >
              Checkboxes
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/radios"
              id="link-radio"
              data-test-id="nav-radio-buttons"
              className={location.pathname === '/radios' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/radios' ? 'page' : undefined}
            >
              Radio Buttons
            </Link>
          </li>

          <li role="menuitem">
            <Link
              to="/selects"
              id="link-select"
              data-test-id="nav-selects"
              className={location.pathname === '/selects' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/selects' ? 'page' : undefined}
            >
              Selects
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/upload"
              id="link-upload"
              data-test-id="nav-file-upload"
              className={location.pathname === '/upload' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/upload' ? 'page' : undefined}
            >
              File Upload
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/tags"
              id="link-tags"
              data-test-id="nav-tags"
              className={location.pathname === '/tags' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/tags' ? 'page' : undefined}
            >
              Tags
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/datepicker"
              id="link-date-picker"
              data-test-id="nav-date-picker"
              className={location.pathname === '/datepicker' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/datepicker' ? 'page' : undefined}
            >
              Date Picker
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/tables"
              id="link-tables"
              data-test-id="nav-tables"
              className={location.pathname === '/tables' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/tables' ? 'page' : undefined}
            >
              Tables
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/cep"
              id="link-cep"
              data-test-id="nav-cep"
              className={location.pathname === '/cep' ? 'active' : ''}
              onClick={closeSidebar}
              aria-current={location.pathname === '/cep' ? 'page' : undefined}
            >
              CEP
            </Link>
          </li>
        </ul>
        
        {/* Help Section - Separated at bottom */}
        <div className="sidebar-help-section">
          <div className="help-separator"></div>
          <ul className="sidebar-help-menu" role="menu">
            <li role="menuitem">
              <Link
                to="/ajuda"
                id="link-help"
                data-test-id="nav-help"
                className={location.pathname === '/ajuda' ? 'active help-link' : 'help-link'}
                onClick={closeSidebar}
                aria-current={location.pathname === '/ajuda' ? 'page' : undefined}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}>
                  <path d="M12 2C12.7956 2 13.5587 2.31607 14.1213 2.87868C14.6839 3.44129 15 4.20435 15 5V7C15.5523 7 16 7.44772 16 8V16C16 16.5523 15.5523 17 15 17H9C8.44772 17 8 16.5523 8 16V8C8 7.44772 8.44772 7 9 7V5C9 4.20435 9.31607 3.44129 9.87868 2.87868C10.4413 2.31607 11.2044 2 12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M10 7H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="5" r="1" fill="currentColor"/>
                  <path d="M11 10H13V14H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="20" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M10 18L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 18L10 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Help
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main 
        className="main-content"
        id="main-content"
        data-test-id="page-content"
        data-page={isDatePickerPage ? 'datepicker' : (isTagsPage ? 'tags' : (isInputsPage ? 'inputs' : (isTextAreaPage ? 'textarea' : (isCEPPage ? 'cep' : (isTablesPage ? 'tables' : undefined)))))}
        role="main"
        aria-live="polite"
      >
        {children}
      </main>
    </div>
  );
}
