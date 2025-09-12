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

  return (
    <div 
      className={`layout-container ${isSidebarOpen ? 'sidebar-open' : ''}`}
      id="main-layout"
      data-test-id="layout-container"
    >
      <div 
        className="top-bar"
        id="top-navigation-bar"
        data-test-id="top-bar"
        role="banner"
      >
        <Breadcrumb />
        <button 
          className="logout-button" 
          onClick={handleLogout}
          data-test-id="logout-button"
          id="logout-btn"
          type="button"
          aria-label="Logout from application"
        >
          Logout
        </button>
      </div>

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
        </ul>
      </nav>

      {/* Main Content */}
      <main 
        className="main-content"
        id="main-content"
        data-test-id="page-content"
        role="main"
        aria-live="polite"
      >
        {children}
      </main>
    </div>
  );
}
