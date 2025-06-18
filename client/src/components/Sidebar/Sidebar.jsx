import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import fetchTitulares from '../../utils/fetchTitulares';
import { setIdEscuela, setListado, setListadoCompleto } from '../../redux/configSlice';
import { useDispatch, useSelector } from 'react-redux';
import fetchEscuelas from '../../utils/fetchEscuelas';
import { data } from 'react-router-dom';

import { useReactToPrint } from "react-to-print";

import { GrDocumentPdf } from "react-icons/gr";
import { MdPrint } from "react-icons/md";
import DynamicSearchCombobox from '../DynamicSearchCombobox/DynamicSearchCombobox ';
import BuscadorDinamicoCombobox from '../BuscadorDinamicoCombobox/BuscadorDinamicoCombobox';
import ReporteLuomInstitucional from '../ReporteLuomInstitucional/ReporteLuomInstitucional';
//import BotonDescargaLUOM from '../BotonDescargaLUOM/BotonDescargaLUOM';

//const Sidebar = () => {
    const Sidebar = ({contentRef}) => {
    const dispatch = useDispatch();
    //ESTADLOS GLOBALES
    const idEscuelaSG = useSelector((state)=>state.config.idEscuela);
    const listadoLuomSG= useSelector((state)=>state.config.listadoCompleto);

    //ESTADOS LOCALES
    const[selectFiltroEscuela, setSelectFiltroEscuela]=useState('');
    const[listadoEscuelas, setListadoEscuelas]=useState([]);
    const[selectedEscuela, setSelectedEscuela]=useState([]);
    const[formatEscuelas, setFormatEscuelas]=useState([]);

    //const componentRef = useRef(null);
    const handlePrintPdf=useReactToPrint({
        contentRef: contentRef,
        documentTitle: "Impresion Documento",
        pageStyle:`
           @page{
                size: legal landscape;
                margin-top: 0.5cm;
                margin-right: 0.25cm;
                margin-left: 0.25cm;
                margin-bottom: 0.5cm; /* 👈 margen inferior */
                padding-bottom:0cm;
            }

            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .body-print {
                    margin-bottom: 0cm;
                    text-align: center;
                    font-size: 12px;
                    color: black;
                    padding-bottom: 0.5cm;
                }

                .footer-print {
                    position: fixed;
                    padding-top: 0cm;
                    margin-bottom: 0cm;
                    padding-bottom: 0cm;
                    padding-top:0.5cm;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    text-align: center;
                    font-size: 12px;
                    color: black;
                }
            }         
        `
    });

    const generaReporte=async()=>{
        //console.log('Ingresa a impresion Reporte');
        await handlePrintPdf();
    };

    /**----- FUNCIONALIDAD PARA DESCARCAR PDF */



    /**--------------------------------------- */


    //TRAE LISTADO DE ESCUELAS
    const traeEscuelas = async()=>{
        //console.log('ingresa a traeEscuelas');
        const dataEscuela = await fetchEscuelas(selectFiltroEscuela);
        //console.log('que trae dataEscuela:',dataEscuela);

        if(dataEscuela &&  dataEscuela?.length!=0){
            setListadoEscuelas(dataEscuela);
        }
    };

    //Busco y filtro la escuela
    const handleSelectEscuela =async(event)=>{
        //console.log('que tiene event: ', event)
        //const{value} = event.target;
        const nombreEscSelect = event.nombre_escuela;
        const idEscSelect = event.id_escuela;
        //console.log('que tiene nombreEscSelect: ', nombreEscSelect);
        //console.log('que tiene idEscSelect: ', idEscSelect);
        setSelectFiltroEscuela(event);

        const filterListadoEscuelas = listadoEscuelas;
        //console.log('que tiene filterListadoEscuelas: ', filterListadoEscuelas);

        const dataEscuela = await filterListadoEscuelas.filter(e=>e.id_escuela == idEscSelect);
        //console.log('que tiene dataEscuela: ', dataEscuela);

        if(dataEscuela){
            setSelectedEscuela(dataEscuela);
            dispatch(setIdEscuela(dataEscuela));
        }else{
            setSelectedEscuela([]);
        }
    };

    const handleCancelFiltroEscuela =()=>{
        setSelectFiltroEscuela('');
        dispatch(setIdEscuela([]));
        dispatch(setListadoCompleto([]));
    };


    const formatearEscuelas = () =>{
        const formated = listadoEscuelas?.map(escuela =>({
            id_escuela: escuela.id_escuela,
            nombre_escuela: `${escuela.numero} - ${escuela.nombre_escuela}`.trim()
        }));
        setFormatEscuelas(formated);
    };

    useEffect(()=>{
        //se aplica filtro de seleccion especialidad
        //Se ejecuta para traer todaslas escuelas pero con paginacion
        //searchListado(selectFiltroEscuela);

        // if(componentRef.current){
        //     console.log('Componente listo para imprimir:', componentRef.current);
        // }

    },[selectFiltroEscuela])

    useEffect(()=>{

        //console.log('que tiene listadoEscuelas:',listadoEscuelas);
        formatearEscuelas();
    },[listadoEscuelas])

    useEffect(()=>{
        //console.log('que tiene formatEscuelas: ',formatEscuelas);
    },[formatEscuelas])

    //AL RENDERIZAR
    useEffect(()=>{
        //LLAMO A PROCEDIMIENTOS INICIALES
        traeEscuelas();
    },[])

  return (
    <div className='notranslate flex flex-col'>
        {/**MENU */}
        <div className='flex flex-row align-center '>
            <div className='flex desktop:flex-row movil:flex-col m-2 items-center justify-center w-[148mm] border-[1px] border-zinc-400 rounded-md py-2'>
                <label className='text-xl font-semibold'>Buscar Escuela: </label>
                <div className='flex flex-row'>
                    <BuscadorDinamicoCombobox
                        escuelas={formatEscuelas} 
                        placeholder="Ingrese N° Escuela..."
                        onSelect={handleSelectEscuela}
                        noResultsText="No se encontraron escuelas"
                        className=" ml-2 mr-[4px]"
                    />
                    {(selectFiltroEscuela!='') &&
                        <label
                            className="text-xl font-bold mr-2 movil:mr-0 cursor-pointer text-red-500"
                            onClick={handleCancelFiltroEscuela}
                        >X</label>
                    }
                </div>
            </div>
            {/**Boton */}
            <div className = 'flex items-center'>
                <button
                    className={`ml-2 movil:mr-2 px-[2px] border-[1px] border-[#73685F] rounded shadow text-2xl w-[33px] h-[35px]
                        ${(selectFiltroEscuela!='')
                            ?`hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6]`
                            :`bg-gray-300 text-white border-gray-300`
                        }
                        `}
                    //disabled={selectFiltroEscuela === ''}
                    onClick={generaReporte}
                ><MdPrint/></button>
                {/* ><GrDocumentPdf/></button> */}
                <label 
                    className={`desktop:flex movil:hidden ml-2 text-base 
                        ${(selectFiltroEscuela!='')
                            ?` text-black animate-bounce`
                            :` text-white border-gray-300 `
                        }
                         `}
                >Imprimir</label>
                {/* <BotonDescargaLUOM datosEscuela={idEscuelaSG} datosLuom={listadoLuomSG} /> */}

            </div>
        </div>

    <div ref={contentRef} className='hidden print:block'>
        <ReporteLuomInstitucional
            datosEscuela={idEscuelaSG}
            datosLuom={listadoLuomSG}
            contentRef={contentRef}
        />
    </div>
    </div>
  )
}

export default Sidebar