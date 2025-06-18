import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReporteLuomPDF from '../ReporteLuomPdf/ReporteLuomPdf';
//import ReporteLuomPDF from './ReporteLuomPDF';

const BotonDescargaLUOM = ({ datosEscuela, datosLuom }) => {
  return (
    <PDFDownloadLink
      document={<ReporteLuomPDF datosEscuela={datosEscuela} datosLuom={datosLuom} />}
      fileName="luom_institucional.pdf"
      style={{
        textDecoration: 'none',
        padding: '10px 20px',
        backgroundColor: '#1e40af',
        color: '#fff',
        borderRadius: '5px',
        fontSize: '14px',
      }}
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Generando PDF...' : 'Descargar LUOM PDF'
      }
    </PDFDownloadLink>
  );
};

export default BotonDescargaLUOM;
