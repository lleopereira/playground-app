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
    <div className={`layout-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="top-bar">
        <Breadcrumb />
        <button 
          className="logout-button" 
          onClick={handleLogout}
          data-test-id="logout-button"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        ref={menuButtonRef}
        className={`menu-toggle ${isSidebarOpen ? 'hidden' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        data-test-id="menu-toggle"
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
        data-test-id="sidebar"
        id="sidebar"
      >
        <h3 id="sidebar-title" data-test-id="sidebar-title">
          <Link to="/playground" className="sidebar-title-link" onClick={closeSidebar}>
            Playground
          </Link>
        </h3>
        <ul>
          <li>
            <Link
              to="/inputs"
              id="link-input-fields"
              data-test-id="link-input-fields"
              className={location.pathname === '/inputs' ? 'active' : ''}
              onClick={closeSidebar}
            >
              Input Fields
            </Link>
          </li>
          <li>
            <Link
              to="/textarea"
              id="link-textarea"
              data-test-id="link-textarea"
              className={location.pathname === '/textarea' ? 'active' : ''}
              onClick={closeSidebar}
            >
              Text Area
            </Link>
          </li>
          <li>
            <Link
              to="/checkboxes"
              id="link-checkbox"
              data-test-id="link-checkbox"
              className={location.pathname === '/checkboxes' ? 'active' : ''}
            >
              Checkboxes
            </Link>
          </li>
          <li>
            <Link
              to="/radios"
              id="link-radio"
              data-test-id="link-radio"
              className={location.pathname === '/radios' ? 'active' : ''}
            >
              Radio Buttons
            </Link>
          </li>

          <li>
            <Link
              to="/selects"
              id="link-select"
              data-test-id="link-select"
              className={location.pathname === '/selects' ? 'active' : ''}
            >
              Selects
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              id="link-upload"
              data-test-id="link-upload"
              className={location.pathname === '/upload' ? 'active' : ''}
            >
              File Upload
            </Link>
          </li>
          <li>
            <Link
              to="/tags"
              id="link-tags"
              data-test-id="link-tags"
              className={location.pathname === '/tags' ? 'active' : ''}
            >
              Tags
            </Link>
          </li>
          <li>
            <Link
              to="/datepicker"
              id="link-date-picker"
              data-test-id="link-date-picker"
              className={location.pathname === '/datepicker' ? 'active' : ''}
            >
              Date Picker
            </Link>
          </li>
          <li>
            <Link
              to="/tables"
              id="link-tables"
              data-test-id="link-tables"
              className={location.pathname === '/tables' ? 'active' : ''}
            >
              Tables
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
