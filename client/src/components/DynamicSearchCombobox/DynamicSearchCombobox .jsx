import React, { useState, useEffect, useRef } from 'react';

const DynamicSearchCombobox = ({ 
  items, 
  placeholder = "Buscar...", 
  onSelect,
  noResultsText = "No se encontraron resultados",
  className = ""
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const comboboxRef = useRef(null);

  // Filtrar items basado en el input
  useEffect(() => {
    if (inputValue.length > 0) {
        console.log('que tiene inputValue: ', items)
    //   const filtered = items.filter(item =>
    //     item.toLowerCase().includes(inputValue.toLowerCase())
    //   );
      //setFilteredItems(filtered);
      setShowDropdown(true);
      setActiveIndex(-1); // Resetear índice activo al filtrar
    } else {
      setFilteredItems([]);
      setShowDropdown(false);
    }
  }, [inputValue, items]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar teclado
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => 
        prev < filteredItems.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleItemSelect(filteredItems[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedItem(null);
  };

  const handleItemSelect = (item) => {
    console.log('que tiene item: ', item);
    setInputValue(item);
    setSelectedItem(item);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div 
      className={`relative ${className}`} 
      ref={comboboxRef}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-haspopup="listbox"
        aria-expanded={showDropdown}
        onClick={() => setShowDropdown(true)}
        aria-autocomplete="list"
        aria-controls="combobox-options"
      />
      
      {showDropdown && (
        <ul 
          id="combobox-options"
          className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60"
          role="listbox"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemSelect(item)}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                  selectedItem === item ? 'bg-blue-100' : ''
                } ${
                  activeIndex === index ? 'bg-blue-50' : ''
                }`}
                role="option"
                aria-selected={selectedItem === item}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 italic">
              {noResultsText}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DynamicSearchCombobox;