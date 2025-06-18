import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const BuscadorEscuelasCombobox = ({ 
  escuelas = [], 
  placeholder = "Buscar escuela...", 
  onSelect,
  noResultsText = "No se encontraron escuelas",
  className = ""
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredEscuelas, setFilteredEscuelas] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEscuela, setSelectedEscuela] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const comboboxRef = useRef(null);

 //TRAER EL STORE GLOBAL DEL IDESCUELA
 const escuelaSG = useSelector((state)=>state.config.idEscuela);

  // Filtrar escuelas basado en el input
  useEffect(() => {
    if (inputValue.length > 0) {
        //console.log('que tiene escuelas: ', escuelas);
      const filtered = escuelas.filter(escuela =>
        escuela.nombre_escuela.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      //console.log('que tiene filtered: ', filtered);
      setFilteredEscuelas(filtered);
      setShowDropdown(true);
      setActiveIndex(-1);
    } else {
      setFilteredEscuelas([]);
      setShowDropdown(false);
    }
  }, [inputValue, escuelas]);

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

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => 
        prev < filteredEscuelas.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleEscuelaSelect(filteredEscuelas[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedEscuela(null);
  };

  const handleEscuelaSelect = (escuela) => {
    setInputValue(escuela.nombre_escuela); // Asegúrate de usar escuela.nombre, no el objeto completo
    setSelectedEscuela(escuela);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(escuela);
    }
  };

  useEffect(()=>{
    //console.log('QUE TIENE escuelaSG: ', escuelaSG);
    if(escuelaSG?.length==0){
        setInputValue('');
    }
  },[escuelaSG])

  return (
    <div 
      className={`relative ${className} desktop:w-[100mm] movil:w-[65mm] notranslate`} 
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
          className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-50"
          role="listbox"
        >
          {filteredEscuelas.length > 0 ? (
            filteredEscuelas.map((escuela, index) => (
              <li
                key={escuela.id_escuela}
                onClick={() => handleEscuelaSelect(escuela)}
                className={`px-6 py-2 cursor-pointer hover:bg-blue-50 ${
                  selectedEscuela?.id === escuela.id_escuela ? 'bg-blue-100' : ''
                } ${
                  activeIndex === index ? 'bg-blue-50' : ''
                }`}
                role="option"
                aria-selected={selectedEscuela?.id === escuela.id_escuela}
              >
                {escuela.nombre_escuela} {/* Renderiza el nombre, no el objeto */}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 italic">
              {inputValue ? noResultsText : "Escribe para buscar escuelas"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BuscadorEscuelasCombobox;