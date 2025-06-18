import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import logoJujuy from '../../assets/logo-jujuy.jpeg';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  schoolInfo: {
    marginVertical: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 2,
    flexGrow: 1,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 9,
  },
});

const ReporteLuomPDF = ({ datosEscuela, datosLuom }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.header}>
        <Image style={styles.logo} src={logoJujuy} />
        <View>
          <Text style={styles.title}>LUOM INSTITUCIONAL PROVISORIO 2025</Text>
          <Text style={styles.subtitle}>JUNTA PROVINCIAL DE CALIFICACION DOCENTE</Text>
          <Text style={styles.subtitle}>SALA PRIMARIA</Text>
        </View>
        <View style={{ width: 50 }} />
      </View>

      <Text style={styles.schoolInfo}>{`ESCUELA N° ${datosEscuela[0]?.numero}`}</Text>
      <Text style={styles.schoolInfo}>{
        `LOCALIDAD: ${datosEscuela[0]?.localidad} - DPTO: ${datosEscuela[0]?.departamento} - REGION: ${datosEscuela[0]?.region} - CAT: ${datosEscuela[0]?.categoria} - MOD: ${datosEscuela[0]?.modalidad} - ZONA: ${datosEscuela[0]?.zona}%`
      }</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>LEGAJO</Text>
          <Text style={styles.tableCell}>DNI</Text>
          <Text style={styles.tableCell}>APELLIDO Y NOMBRE</Text>
          <Text style={styles.tableCell}>FECHA INGRESO</Text>
          <Text style={styles.tableCell}>ESP</Text>
          <Text style={styles.tableCell}>P.ANT</Text>
          <Text style={styles.tableCell}>A</Text>
          <Text style={styles.tableCell}>B</Text>
          <Text style={styles.tableCell}>C</Text>
          <Text style={styles.tableCell}>D</Text>
          <Text style={styles.tableCell}>E</Text>
          <Text style={styles.tableCell}>F</Text>
          <Text style={styles.tableCell}>TOTAL</Text>
          <Text style={styles.tableCell}>NOTIFICADO</Text>
        </View>

        {datosLuom?.map((docente, index) => (
          <View style={styles.tableRow} key={index} wrap={false}>
            <Text style={styles.tableCell}>{docente.legajo}</Text>
            <Text style={styles.tableCell}>{docente.dni}</Text>
            <Text style={styles.tableCell}>{docente.nombre}</Text>
            <Text style={styles.tableCell}>{docente.fecha_ingreso}</Text>
            <Text style={styles.tableCell}>{docente.abreviatura}</Text>
            <Text style={styles.tableCell}>{docente.puntaje_anterior}</Text>
            <Text style={styles.tableCell}>{docente.item_a}</Text>
            <Text style={styles.tableCell}>{docente.item_b}</Text>
            <Text style={styles.tableCell}>{docente.item_c}</Text>
            <Text style={styles.tableCell}>{docente.item_d}</Text>
            <Text style={styles.tableCell}>{docente.item_e}</Text>
            <Text style={styles.tableCell}>{docente.item_f}</Text>
            <Text style={styles.tableCell}>{docente.total}</Text>
            <Text style={styles.tableCell}>{''}</Text>
          </View>
        ))}
      </View>

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

export default ReporteLuomPDF;
