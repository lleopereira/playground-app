import React, { useState, useRef, useEffect } from 'react';
import './DatePicker.css';
import FormSubmitOverlay from '../components/FormSubmitOverlay';

export default function DatePicker() {
  // Portuguese month names for display
  const PORTUGUESE_MONTHS = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Portuguese day names for calendar header
  const PORTUGUESE_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // State Management
  // selectedDate: The currently selected date (Date object)
  // currentMonth: Month being displayed in calendar (0-11)
  // currentYear: Year being displayed in calendar
  // isCalendarOpen: Controls calendar modal visibility
  // showOverlay: Controls form submission overlay
  // showMonthDropdown: Controls month dropdown visibility
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  // References for DOM elements
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const monthDropdownRef = useRef(null);

  // Event Handler Functions

  /**
   * formatDateToPortuguese - Converts Date object to Portuguese format
   * @param {Date} date - Date object to format
   * @returns {string} - Formatted date string (e.g., "22 de Outubro, 2025")
   */
  const formatDateToPortuguese = (date) => {
    if (!date) return '';
    const day = date.getDate();
    const month = PORTUGUESE_MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month}, ${year}`;
  };

  /**
   * toggleCalendar - Opens/closes the calendar modal
   * Resets the calendar to the selected date's month/year when opening
   */
  const toggleCalendar = () => {
    if (!isCalendarOpen && selectedDate) {
      // Reset calendar to selected date's month/year when opening
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
    setIsCalendarOpen(!isCalendarOpen);
    setShowMonthDropdown(false); // Close month dropdown if open
  };

  /**
   * selectDate - Handles date selection from calendar
   * @param {number} day - Day of the month selected
   * Creates a new Date object and closes the calendar
   */
  const selectDate = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setIsCalendarOpen(false);
    setShowMonthDropdown(false);
  };

  /**
   * navigateMonth - Changes the displayed month
   * @param {number} direction - -1 for previous month, 1 for next month
   * Handles year wrapping when going from December to January or vice versa
   */
  const navigateMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    // Handle month wrapping
    if (newMonth < 0) {
      newMonth = 11; // December
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0; // January
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setShowMonthDropdown(false);
  };

  /**
   * navigateYear - Changes the displayed year
   * @param {number} direction - -1 for previous year, 1 for next year
   */
  const navigateYear = (direction) => {
    setCurrentYear(currentYear + direction);
    setShowMonthDropdown(false);
  };

  /**
   * selectMonth - Handles month selection from dropdown
   * @param {number} monthIndex - Index of selected month (0-11)
   */
  const selectMonth = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setShowMonthDropdown(false);
  };

  /**
   * toggleMonthDropdown - Opens/closes month selection dropdown
   */
  const toggleMonthDropdown = () => {
    setShowMonthDropdown(!showMonthDropdown);
  };

  /**
   * getDaysInMonth - Calculates number of days in current month
   * @returns {number} - Number of days in the current month
   */
  const getDaysInMonth = () => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  };

  /**
   * getFirstDayOfMonth - Gets the day of week for first day of month
   * @returns {number} - Day of week (0 = Sunday, 6 = Saturday)
   */
  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  /**
   * isSelectedDate - Checks if a day is the currently selected date
   * @param {number} day - Day to check
   * @returns {boolean} - True if day matches selected date
   */
  const isSelectedDate = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth &&
           selectedDate.getFullYear() === currentYear;
  };

  /**
   * isToday - Checks if a day is today's date
   * @param {number} day - Day to check
   * @returns {boolean} - True if day is today
   */
  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentMonth &&
           today.getFullYear() === currentYear;
  };

  /**
   * handleSubmit - Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  // Click outside handler to close calendar and dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close calendar if clicking outside
      if (calendarRef.current && !calendarRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
      
      // Close month dropdown if clicking outside
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setShowMonthDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate calendar days array for rendering
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Component Render
  return (
    <div 
      className="page-content"
      id="datepicker-page"
      data-test-id="datepicker-page-content"
    >
      {/* Page Title */}
      <h1 
        id="page-title" 
        data-test-id="page-title-heading"
        className="page-title"
      >
        Date Picker
      </h1>
      
      {/* Main Form Container */}
      <form 
        onSubmit={handleSubmit} 
        className="datepicker-form"
        id="datepicker-form"
        data-test-id="datepicker-form"
        aria-label="Date picker form"
      >
        {/* Date Picker Input Group */}
        <div 
          className={`input-group ${isCalendarOpen ? 'calendar-open' : ''}`}
          data-test-id="datepicker-input-group"
        >
          <label 
            htmlFor="datepicker-input"
            className="input-label"
            data-test-id="datepicker-label"
          >
            Date picker
          </label>
          
          {/* Custom Date Input */}
          <div className="datepicker-input-container">
            <input
              ref={inputRef}
              type="text"
              id="datepicker-input"
              className="datepicker-input"
              value={formatDateToPortuguese(selectedDate)}
              onClick={toggleCalendar}
              readOnly
              placeholder="Selecione uma data"
              data-test-id="datepicker-input-field"
              aria-label="Selected date, click to open calendar"
              aria-expanded={isCalendarOpen}
              aria-haspopup="dialog"
            />
            <button
              type="button"
              className="calendar-icon-button"
              onClick={toggleCalendar}
              aria-label="Open calendar"
              data-test-id="calendar-toggle-button"
            >
              📅
            </button>
          </div>

          {/* Custom Calendar Modal */}
          {isCalendarOpen && (
            <div 
              ref={calendarRef}
              className="calendar-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Date picker calendar"
              data-test-id="calendar-modal"
            >
              {/* Calendar Header */}
              <div className="calendar-header">
                {/* Month Navigation */}
                <div className="month-navigation">
                  <button
                    type="button"
                    className="nav-button prev-month"
                    onClick={() => navigateMonth(-1)}
                    aria-label="Previous month"
                    data-test-id="prev-month-button"
                  >
                    ←
                  </button>
                  
                  {/* Month Dropdown */}
                  <div className="month-selector" ref={monthDropdownRef}>
                    <button
                      type="button"
                      className="month-button"
                      onClick={toggleMonthDropdown}
                      aria-label="Select month"
                      aria-expanded={showMonthDropdown}
                      data-test-id="month-dropdown-button"
                    >
                      {PORTUGUESE_MONTHS[currentMonth]}
                      <span className="dropdown-arrow">▼</span>
                    </button>
                    
                    {/* Month Dropdown Menu */}
                    {showMonthDropdown && (
                      <div className="month-dropdown" data-test-id="month-dropdown-menu">
                        {PORTUGUESE_MONTHS.map((month, index) => (
                          <button
                            key={month}
                            type="button"
                            className={`month-option ${index === currentMonth ? 'selected' : ''}`}
                            onClick={() => selectMonth(index)}
                            data-test-id={`month-option-${index}`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    className="nav-button next-month"
                    onClick={() => navigateMonth(1)}
                    aria-label="Next month"
                    data-test-id="next-month-button"
                  >
                    →
                  </button>
                </div>

                {/* Year Navigation */}
                <div className="year-navigation">
                  <button
                    type="button"
                    className="year-nav-button"
                    onClick={() => navigateYear(1)}
                    aria-label="Next year"
                    data-test-id="next-year-button"
                  >
                    ▲
                  </button>
                  <span className="current-year" data-test-id="current-year">
                    {currentYear}
                  </span>
                  <button
                    type="button"
                    className="year-nav-button"
                    onClick={() => navigateYear(-1)}
                    aria-label="Previous year"
                    data-test-id="prev-year-button"
                  >
                    ▼
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="calendar-grid">
                {/* Day Headers */}
                <div className="calendar-days-header">
                  {PORTUGUESE_DAYS.map((day) => (
                    <div key={day} className="day-header" data-test-id={`day-header-${day}`}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="calendar-days">
                  {generateCalendarDays().map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`calendar-day ${
                        day === null ? 'empty' : ''
                      } ${
                        day && isSelectedDate(day) ? 'selected' : ''
                      } ${
                        day && isToday(day) ? 'today' : ''
                      }`}
                      onClick={() => day && selectDate(day)}
                      disabled={day === null}
                      aria-label={day ? `Select ${day} de ${PORTUGUESE_MONTHS[currentMonth]}, ${currentYear}` : ''}
                      data-test-id={day ? `calendar-day-${day}` : `empty-day-${index}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          id="submit-button"
          data-test-id="form-submit-button"
          className="submit-button"
          aria-label="Submit selected date"
        >
          Enviar
        </button>
      </form>

      {/* Form Submission Overlay */}
      {showOverlay && (
        <FormSubmitOverlay 
          formData={{
            selectedDate: formatDateToPortuguese(selectedDate),
            dateObject: selectedDate
          }}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}