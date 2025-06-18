import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PruebaImp = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "demo-print",
  });

  return (
    <div>
      <button onClick={handlePrint}>Imprimir</button>

      <div ref={componentRef} style={{ padding: 20, marginTop: 20, border: "1px solid black" }}>
        <h2>Contenido Imprimible</h2>
        <p>Este es el texto que se imprimirá.</p>
      </div>
    </div>
  );
};

export default PruebaImp;