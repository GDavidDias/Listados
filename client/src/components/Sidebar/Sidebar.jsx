import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import fetchTitulares from '../../utils/fetchTitulares';
import { setIdEscuela, setListado, setListadoCompleto, setTipoLom } from '../../redux/configSlice';
import { useDispatch, useSelector } from 'react-redux';
import fetchEscuelas from '../../utils/fetchEscuelas';
import { data, useParams } from 'react-router-dom';
import { ImArrowRight } from "react-icons/im";

import { useReactToPrint } from "react-to-print";

import { GrDocumentPdf } from "react-icons/gr";
import { MdPrint } from "react-icons/md";
import DynamicSearchCombobox from '../DynamicSearchCombobox/DynamicSearchCombobox ';
import BuscadorDinamicoCombobox from '../BuscadorDinamicoCombobox/BuscadorDinamicoCombobox';
import ReporteLuomInstitucional from '../ReporteLuomInstitucional/ReporteLuomInstitucional';
//import BotonDescargaLUOM from '../BotonDescargaLUOM/BotonDescargaLUOM';

//const Sidebar = () => {
const Sidebar = ({contentRef}) => {
    const {token} = useParams();
    //console.log('que tiene token en Sidebar:', token);

    const dispatch = useDispatch();
    //ESTADLOS GLOBALES
    const idEscuelaSG = useSelector((state)=>state.config.idEscuela);
    const listadoLuomSG= useSelector((state)=>state.config.listadoCompleto);
    const tokenSG = useSelector((state)=>state.token);
    const tipoLomSG = useSelector((state)=>state.config.tipoLom);

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
        //const nombreEscSelect = event.nombre_escuela;
        const idEscSelect = event?.id_escuela;
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

    const filterEscuelaToken = async(tokenEscuela)=>{
        //console.log('que tiene tokenEscuela: ', tokenEscuela);
        const filterListadoEscuelas = listadoEscuelas;
        const filterEscuela = await filterListadoEscuelas.filter(e=>e.token==tokenEscuela);
        //console.log('que tiene filterEscuela: ', filterEscuela);
        handleSelectEscuela(filterEscuela[0]);
    }

    //!---  V1.1  ---
    const cambiaDefinitivo =()=>{
        console.log('Presiono boton LOM DEFINITIVO');
        dispatch(setTipoLom(1));
    };

    const cambiaProvisorio =()=>{
        console.log('Presiono boton LOM PROVISORIO');
        dispatch(setTipoLom(2));
    };


    //!---------------

    useEffect(()=>{
        //se aplica filtro de seleccion especialidad
        //Se ejecuta para traer todaslas escuelas pero con paginacion
        //searchListado(selectFiltroEscuela);

        // if(componentRef.current){
        //     console.log('Componente listo para imprimir:', componentRef.current);
        // }

    },[selectFiltroEscuela])


    useEffect(()=>{
        // if(tokenSG && tokenSG!=''){
        //     console.log('que tiene tokenSG en sidebar:', tokenSG);
        //     filterEscuelaToken(tokenSG);
        // }
    },[tokenSG])

    useEffect(()=>{
        //console.log('que tiene listadoEscuelas:',listadoEscuelas);
        formatearEscuelas();

        //console.log('que tiene tokenSG en sidebar:', tokenSG);
        if(token && token!=''){
            filterEscuelaToken(token);
        }
    },[listadoEscuelas])

    useEffect(()=>{
        //console.log('que tiene formatEscuelas: ',formatEscuelas);
    },[formatEscuelas])

    useEffect(()=>{
        console.log('que tiene tipoLomSG: ', tipoLomSG);
    },[tipoLomSG])

    //AL RENDERIZAR
    useEffect(()=>{
        //LLAMO A PROCEDIMIENTOS INICIALES
        traeEscuelas();
    },[])

  return (
    <div className='notranslate flex flex-col'>
        {/**MENU */}
        <div className='flex flex-row align-center justify-between '>
            {/* <div className='flex desktop:flex-row movil:flex-col m-2 items-center justify-center w-[148mm] border-[1px] border-zinc-400 rounded-md py-2'>
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
            </div> */}

            {/**BOTONES DE LOMS */}
            <div className='flex flex-row'>
                {/**BOTON DEFINITIVO */}
                <div className='flex items-center my-2'>
                    <button
                    className={`ml-2 desktop:mr-8 movil:mr-2 px-[2px] border-[1px] rounded shadow w-[160px] h-[35px]  border-cyan-700 bg-cyan-700 text-white
                            ${(tipoLomSG==1)
                                ?` bg-blue-400 text-white`
                                :` bg-cyan-700 text-white border-cyan-700 hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6]`
                            }
                            `}
                    onClick={cambiaDefinitivo}
                    >   
                        <div className='flex flex-row justify-center'>
                            <label className='mx-2 font-bold'>LOM DEFINITIVO</label>
                        </div>
                    </button>
                </div>

                {/**BOTON PROVISORIO */}
                <div className='flex items-center my-2'>
                    <button
                    className={`ml-2 desktop:mr-8 movil:mr-2 px-[2px] border-[1px] rounded shadow w-[160px] h-[35px]  border-cyan-700 bg-cyan-700 text-white
                            ${(tipoLomSG==2)
                                ?` bg-blue-400 text-white `
                                :` bg-cyan-700 text-white border-cyan-700 hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6]`
                            }
                            `}
                    onClick={cambiaProvisorio}
                    >
                        <div className='flex flex-row justify-center'>
                            <label className='mx-2 font-bold'>LOM PROVISORIO</label>
                            
                        </div>
                    </button>
                </div>
            </div>

            {/**Boton IMPRIMIR*/}
            <div className = 'flex items-center my-2 '>
                <div className=' text-4xl align-center animate-bouncex text-sky-950'>
                    <ImArrowRight />
                </div>
                {/* <label 
                    className={`desktop:flex movil:hidden ml-4 text-base 
                        ${(selectFiltroEscuela!='')
                            ?` text-black font-bold animate-bounce`
                            :` text-white border-gray-300 `
                        }
                         `}
                >Imprimir</label> */}
                <button
                    className={`ml-2 desktop:mr-8 movil:mr-2 px-[2px] border-[1px] rounded shadow w-[140px] h-[35px]  border-cyan-700 bg-cyan-700 text-white
                        ${(selectFiltroEscuela!='')
                            ?` hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6]`
                            :` bg-cyan-700 text-white border-cyan-700`
                        }
                        `}
                    //disabled={selectFiltroEscuela === ''}
                    onClick={generaReporte}
                >
                    <div className='flex flex-row justify-center'>
                        <label className='mx-2 font-bold'>IMPRIMIR</label>
                        <div className='text-2xl'><MdPrint/></div>
                    </div>
                </button>
                {/* ><GrDocumentPdf/></button> */}
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