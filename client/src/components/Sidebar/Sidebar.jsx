import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import fetchTitulares from '../../utils/fetchTitulares';
import { setIdEscuela, setListado, setListadoCompleto, setTipoLom, setNivel} from '../../redux/configSlice';
import { useDispatch, useSelector } from 'react-redux';
import fetchEscuelas from '../../utils/fetchEscuelas';
import fetchEscuelaID from '../../utils/fetchEscuelaID';
import fetchDNI from '../../utils/fetchDNI';
import { data, useParams } from 'react-router-dom';
import { ImArrowRight } from "react-icons/im";
import axios from 'axios';
import { URL } from '../../../varGlobal';

import { useReactToPrint } from "react-to-print";

import { GrDocumentPdf } from "react-icons/gr";
import { MdPrint } from "react-icons/md";
//import DynamicSearchCombobox from '../DynamicSearchCombobox/DynamicSearchCombobox ';
import BuscadorDinamicoCombobox from '../BuscadorDinamicoCombobox/BuscadorDinamicoCombobox';
import ReporteLuomInstitucional from '../ReporteLuomInstitucional/ReporteLuomInstitucional';
//import BotonDescargaLUOM from '../BotonDescargaLUOM/BotonDescargaLUOM';

//const Sidebar = () => {
const Sidebar = ({contentRef}) => {
    //const {token} = useParams();
    //console.log('que tiene token en Sidebar:', token);

    const dispatch = useDispatch();
    //ESTADLOS GLOBALES
    const idEscuelaSG = useSelector((state)=>state.config.idEscuela);
    const listadoLuomSG= useSelector((state)=>state.config.listadoCompleto);
    const tokenSG = useSelector((state)=>state.token);
    const tipoLomSG = useSelector((state)=>state.config.tipoLom);
    const nivelSG = useSelector((state)=>state.config.nivel);

    //ESTADOS LOCALES

    //ESTADOS LOCALES DEL COMPONETNE DE BUSQUEDA DE ESCUELA
    const[selectFiltroEscuela, setSelectFiltroEscuela]=useState('');
    const[resultados, setResultados] = useState([]);
    const[mostrarLista, setMostrarLista] = useState(false);
    
    //ESTADOS LOCALES DEL COMPONENTE DE BUSQUEDA POR DNI
    const[selectFiltroDNI, setSelectFiltroDNI]=useState('');
    const[resultadosDNI, setResultadosDNI] = useState([]);
    const[mostrarListaDNI, setMostrarListaDNI] = useState(false);

    const[listadoEscuelas, setListadoEscuelas]=useState([]);
    const[selectedEscuela, setSelectedEscuela]=useState([]);
    const[formatEscuelas, setFormatEscuelas]=useState([]);

const [imprimirPendiente, setImprimirPendiente] = useState(false);

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
        setImprimirPendiente(true);

        //await handlePrintPdf();
    };

    /**----- FUNCIONALIDAD PARA DESCARCAR PDF */
    


    /**--------------------------------------- */


    //TRAE LISTADO DE ESCUELAS
    const traeEscuelas = async()=>{
        console.log('ingresa a traeEscuelas');
        const dataEscuela = await fetchEscuelas(selectFiltroEscuela);
        console.log('que trae dataEscuela:',dataEscuela);

        if(dataEscuela &&  dataEscuela?.length!=0){
            setListadoEscuelas(dataEscuela);
        }

    };

    //Busco y filtro la escuela
    const handleSelectEscuela =async(event)=>{
        console.log('que tiene event: ', event)
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
        //console.log('Presiono boton LOM DEFINITIVO');
        dispatch(setTipoLom('d'));
    };

    const cambiaProvisorio =()=>{
        //console.log('Presiono boton LOM PROVISORIO');
        dispatch(setTipoLom('p'));
    };


    //!---  V1.2  ---
    
    //?----BUSCADOR ESCUELA CON COMBOBOX DINAMICO ----
    const buscarEscuelas = async (valor) => {
        console.log('que tiene valor: ', valor);

        //Borro el valor del input dni
        setSelectFiltroDNI('');
        setResultadosDNI([]);
        setMostrarListaDNI(false);

        setSelectFiltroEscuela(valor);

        if(valor.trim() === ''){
            setResultados([]);
            setMostrarLista(false);
            return;
        }

        //Realiza llamado a fetch Escuelas para traer valores que coinciden con el valor ingresado
        const data = await fetchEscuelas(valor);
        console.log('que trae data de fetchEscuelas en buscarEscuelas: ', data);
        setResultados(data || []);
        setMostrarLista(true);
    };

    const seleccionarEscuela = (escuela) => {
        console.log('que tiene escuela: ', escuela);
        setSelectFiltroEscuela(
            `${escuela.numero} - ${escuela.nombre_escuela}`
        );

        setMostrarLista(false);
        dispatch(setIdEscuela([escuela]));
        setSelectedEscuela([escuela]);
    };
    
    const handleCancelFiltroEscuela =()=>{
        setSelectFiltroEscuela('');
        dispatch(setIdEscuela([]));
        dispatch(setListadoCompleto([]));
        setSelectedEscuela([]);
        setSelectFiltroDNI('');
        setMostrarLista(false);
    };


    //?----BUSCADOR DNI CON COMBOBOX DINAMICO ----
    const buscarDNI = async (valor) => {
        console.log('que tiene valor: ', valor);

        //Borro el valor del input escuela
        setSelectFiltroEscuela('');
        setResultados([]);
        setMostrarLista(false);

        setSelectFiltroDNI(valor);

        if(valor.trim() === ''){
            setResultadosDNI([]);
            setMostrarListaDNI(false);
            return;
        }

        //Realiza llamado a fetch DNI para traer valores que coinciden con el valor ingresado
        
        const data = await fetchDNI(valor, tipoLomSG);
        console.log('que trae data de fetchDNI en buscarDNI: ', data);
        setResultadosDNI(data || []);
        setMostrarListaDNI(true);
    };

    const seleccionarDNI = (dni) => {
        console.log('que tiene dni: ', dni);
        setSelectFiltroDNI(dni.dni);
        setMostrarListaDNI(false);
        buscarEscuelaDNI(dni.id_escuela);
    };
    
    const handleCancelFiltroDNI =()=>{
        setSelectFiltroDNI('');
        setResultadosDNI([]);
        setMostrarListaDNI(false);
        dispatch(setIdEscuela([]));
        dispatch(setListadoCompleto([]));
        setSelectedEscuela([]);
        setSelectFiltroEscuela('');
    };

    const buscarEscuelaDNI = async (idEscuela) => {
        console.log('que tiene idEscuela: ', idEscuela);
        const data = await fetchEscuelaID(idEscuela);
        console.log('que trae data de fetchEscuelaID en buscarEscuelaDNI: ', data);
        if (data && data.length > 0) {
            setSelectFiltroEscuela(`${data[0].numero} - ${data[0].nombre_escuela}`);
            dispatch(setIdEscuela([data[0]]));
            setSelectedEscuela([data[0]]);
        }
    };

    const traeConfiguracionNivel = async()=>{
        console.log('ingresa a traeConfiguracionNivel');
        const dataNivel = await axios.get(`${URL}/api/configuracionnivel`);
        console.log('que trae dataNivel:',dataNivel.data[0]);
        
        dispatch(setNivel(dataNivel.data[0]?.nivel));
    }

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

    {/**
        
        useEffect(()=>{
            //console.log('que tiene listadoEscuelas:',listadoEscuelas);
            formatearEscuelas();
    
            //console.log('que tiene tokenSG en sidebar:', tokenSG);
            if(token && token!=''){
                filterEscuelaToken(token);
            }
        },[listadoEscuelas])
        */}

    useEffect(()=>{
        //console.log('que tiene formatEscuelas: ',formatEscuelas);
    },[formatEscuelas])

    useEffect(()=>{
        //console.log('que tiene tipoLomSG: ', tipoLomSG);
    },[tipoLomSG])

    //AL RENDERIZAR
    useEffect(()=>{
        //LLAMO A PROCEDIMIENTO PARA TRAER CONFIGURACION DE NIVEL
        traeConfiguracionNivel();

    },[])

    useEffect(()=>{
        if(!imprimirPendiente) return;
        
        const imprimir = async()=>{
            await handlePrintPdf();
            setImprimirPendiente(false);
        };
        imprimir();
    },[imprimirPendiente]);


  return (
    <div className='notranslate flex flex-col'>
        {/**MENU */}
        <div className='flex flex-row align-center justify-left '>
        
            <div className='flex desktop:flex-row movil:flex-col m-2 items-center  w-[150mm] border-[0px] border-zinc-800 rounded-md py-2'>

                {/**BUSCADOR DE ESCUELA */}
                <div className="relative flex flex-row ml-2">
                    <div className="w-[220px] h-[40px] bg-white border border-zinc-800 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 items-center flex">
                        <input
                            type="text"
                            placeholder="Ingrese Nro Institución..."
                            //className="border border-zinc-800 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            className="focus:outline-none"
                            value={selectFiltroEscuela}
                            onChange={(e) => buscarEscuelas(e.target.value)}
                        />

                        {selectFiltroEscuela !== '' &&
                            <label
                                className="text-xl font-bold ml-2 cursor-pointer text-red-500"
                                onClick={handleCancelFiltroEscuela}
                            >
                                X
                            </label>
                        }

                    </div>

                    {/**LISTADO DE COMBOBOX BUSCADOR ESCUELA*/}
                    {mostrarLista && resultados.length > 0 && (

                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto text-sm ">

                            {resultados.map((escuela) => (
                                <div
                                    key={escuela.id_escuela}
                                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => seleccionarEscuela(escuela)}
                                >
                                    <span className='font-bold text-blue-500'>{escuela.numero}</span> 
                                    {" - "}
                                    {escuela.nombre_escuela}
                                </div>
                            ))}
                        </div>
                    )}

                </div>


                {/**BUSCADOR DE DNI */}
                <div className="relative flex flex-row ml-2">
                    <div className="w-[250px] h-[40px] bg-white border border-zinc-800 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 items-center flex">
                        <input
                            type="text"
                            placeholder="Ingrese DNI..." 
                            //className="border border-zinc-800 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            className="focus:outline-none w-[240px]" 
                            value={selectFiltroDNI}
                            onChange={(e) => buscarDNI(e.target.value)}
                        />

                        {selectFiltroDNI !== '' &&
                            <label
                                className="text-xl font-bold ml-2 cursor-pointer text-red-500"
                                onClick={handleCancelFiltroDNI}
                            >
                                X
                            </label>
                        }

                    </div>

                    {/**LISTADO DE COMBOBOX BUSCADOR DNI*/}
                    {mostrarListaDNI && resultadosDNI.length > 0 && (

                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto text-sm ">

                            {resultadosDNI.map((dni) => (
                                <div
                                    key={dni.id_dni}
                                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => seleccionarDNI(dni)}
                                >
                                    <span className='font-bold text-blue-500'>{dni.dni}</span> 
                                    {" - "}
                                    <span className='font-light'>{dni.nombre}</span>
                                    <span className='font-bold  text-gray-500'>{` (${dni.abreviatura})`}</span>
                                    <span className='font-bold text-green-500'> 
                                    {` | Esc: ${dni.Nro_Escuela}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div> 

            {/**BOTONES DE LOMS */}
            <div className='flex flex-row'>
                {/**BOTON DEFINITIVO */}
                {/**HABILITAR CUANDO SALGA EL DEFINITIVO */}
                {/**
                 

                <div className='flex items-center my-2 '>
                    <button
                    className={`ml-2 desktop:mr-8 movil:mr-2 px-[2px] border-[1px] rounded shadow w-[160px] h-[35px]  border-cyan-700  text-white drop-shadow cursor-pointer
                            ${(tipoLomSG==='d')
                                ?` bg-blue-400 text-white`
                                :` bg-cyan-700 text-white border-cyan-700 hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] `
                            }
                            `}
                    onClick={cambiaDefinitivo}
                    >   
                        <div className='flex flex-row justify-center'>
                            <label className='mx-2 font-bold cursor-pointer animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]'>LOM DEFINITIVO</label>
                        </div>
                    </button>
                </div>
                 */}

                {/**BOTON PROVISORIO */}
                <div className='flex items-center my-2'>
                    <button
                    className={`ml-2 desktop:mr-8 movil:mr-2 px-[2px] border-[1px] rounded shadow w-[160px] h-[35px]  border-cyan-700  text-white drop-shadow cursor-pointer
                            ${(tipoLomSG==='p')
                                ?` bg-blue-400 text-white `
                                :` bg-cyan-700 text-white border-cyan-700 hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6]`
                            }
                            `}
                    onClick={cambiaProvisorio}
                    >
                        <div className='flex flex-row justify-center'>
                            <label className='mx-2 font-bold cursor-pointer'>LOM PROVISORIO</label>
                            
                        </div>
                    </button>
                </div>
            </div>

            {/**Boton IMPRIMIR*/}
            {(tipoLomSG==='p' && selectedEscuela.length!=0) &&
                <div className = 'flex items-center my-2 '>
                    <div className=' text-4xl align-center animate-bouncex text-sky-950'>
                        <ImArrowRight />
                    </div>
                    <button
                        className={`ml-2 desktop:mr-8 movil:mr-2 px-[2px] border-[1px] rounded shadow w-[140px] h-[35px]  border-cyan-700 bg-cyan-700 text-white drop-shadow cursor-pointer
                            ${(selectFiltroEscuela!='')
                                ?` hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6]`
                                :` bg-cyan-700 text-white border-cyan-700`
                            }
                            `}
                        onClick={generaReporte}
                    >
                        <div className='flex flex-row justify-center'>
                            <label className='mx-2 font-bold cursor-pointer'>IMPRIMIR</label>
                            <div className='text-2xl'><MdPrint/></div>
                        </div>
                    </button>
                </div>
            }
            {(tipoLomSG=='p') &&
                <div className = 'flex items-center my-2 '>
                    {/**LEYENDA SOLO IMPRESION LOM DEFINITIVO HABILITAR CUANDO SALGA LOM DEFINITIVO */}
                    {/**
                     
                    <div className='animate-bounce'>
                        <p className='font-extrabold text-red-500 text-xl mr-4'>SOLO SE PUEDE IMPRIMIR EL LOM DEFINITIVO</p>
                    </div>
                     */}
                    
                </div>
            }

        </div>

    {imprimirPendiente   &&
    <div ref={contentRef} className='hidden print:block'>
        <ReporteLuomInstitucional
            datosEscuela={idEscuelaSG}
            datosLuom={listadoLuomSG}
            contentRef={contentRef}
        />
    </div>
    }
    </div>
  )
}

export default Sidebar