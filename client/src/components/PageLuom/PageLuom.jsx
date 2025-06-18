import React, { forwardRef, useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import logoJujuy from '../../assets/logo-jujuy.jpeg';
import Paginador from '../Paginador/Paginador';
import fetchTitulares from '../../utils/fetchTitulares';
import { setListado, setListadoCompleto } from '../../redux/configSlice';


const PageLuom = forwardRef((props, componentRef) => {

    const dispatch = useDispatch();

    const idEscuelaSG = useSelector((state)=>state.config.idEscuela);

    const listadoSG = useSelector((state)=>state.config.listado);

    //E.L. guarda la pagina actual de listado
    const[currentPage, setCurrentPage]=useState(1);
    //E.L. para guardar datos de paginacion de listado
    const[paginacion, setPaginacion]=useState('');

    //TRAE LISTADO DE TITULARES
    const searchListado = async(datos_escuela, page) =>{
        let data;
        let idEscuela;
        //console.log('que ingresa id_escuela: ', datos_escuela);
        if(datos_escuela){
            idEscuela=datos_escuela.id_escuela 
        }else{
            idEscuela="";
        }
        //console.log('como queda idEscuela: ', idEscuela);
        const limit = 15;
        //const page =1;
        const cargo='';
        const legajo = '';  
        data = await fetchTitulares(idEscuela, page, cargo, legajo, limit);
        //console.log('que trae data de fetchTitulares: ', data);

        if(data && data.result?.length!=0){
            //setCurrentPage(1);
            dispatch(setListado(data.result));
            setPaginacion(data.paginacion);
        }else{
            setCurrentPage(1);
            dispatch(setListado([]));
            setPaginacion(data.paginacion);
        }

        //TAIGO LOS DAOTS COMPLETOS DEL LUOM PORESCUELA
        const dataCompleto = await fetchTitulares(idEscuela, page, cargo, legajo, 999999);
        //console.log('que trae data completo: ', dataCompleto);
        if(dataCompleto && dataCompleto.result?.length!=0){
            dispatch(setListadoCompleto(dataCompleto.result));
        }else{
            dispatch(setListadoCompleto([]));
        }
    };

    const handlePageChange = (nuevaPagina)=>{
        //console.log('que tiene nuevaPagina: ', nuevaPagina);
        if(nuevaPagina>0 && nuevaPagina<=paginacion?.totalPages){
            setCurrentPage(nuevaPagina);
        };
    };

    useEffect(()=>{
        //console.log('que trae listadoSG: ', listadoSG);
    },[listadoSG]);

    useEffect(()=>{
        console.log('>>que tiene idEscuelaSG: ', idEscuelaSG);
        setCurrentPage(1);
        searchListado(idEscuelaSG[0],currentPage);

        // if(idEscuelaSG.length!=0){
        //     searchListado(idEscuelaSG[0],currentPage);
        // }else{
        //     searchListado([])
        //     setCurrentPage(1);
        // }
    },[idEscuelaSG]);
    
    useEffect(()=>{
        //console.log('que tiene currentPage: ', currentPage);
        searchListado(idEscuelaSG[0],currentPage)

    },[currentPage])


  return (
    <div className='notranslate w-full h-full  border-[1px] border-zinc-500 mr-4 '>
        {(idEscuelaSG?.length!=0) &&
        <div>
            <div className=''>
                {/**ENCABEZADO DE TABLA */}
                <div 
                    className='w-full flex flex-col border-t-[1px] border-x-[1px] border-zinc-400
                    transition-all duration-500 
                    '
                >
                    {/**TITULOS */}
                    <div className='flex flex-row bg-white transition-all duration-500 '>
                        {/**LOGO JUJUY */}
                        {/* <div className="w-[25%] flex ">
                            <img src={logoJujuy} className='w-[8vw]'/>
                        </div> */}
                        {/**TITULO */}
                        {/* <div className="w-[50%] flex justify-center font-bold desktop-md:text-2xl desktop:text-lg ">
                            <label>LOM INSTITUCIONAL PROVISORIO 2025</label>
                        </div> */}
                        {/**IMAGEN DERECHA */}
                        {/* <div className="w-[25%] flex justify-end">
                            <div className='flex flex-col desktop-md:items-center mr-2 desktop:items-end'>
                                <label className='desktop:text-xs desktop-md:text-sm'>JUNTA PROVINCIAL DE CALIFICACION DOCENTE</label>
                                <label className='desktop:text-xs desktop-md:text-sm font-bold'>SALA PRIMARIA</label>
                            </div>
                        </div> */}
                    </div>
                    {/**DATOS DE ESCUELA */}
                    <div className='flex bg-zinc-100 justify-center items-center'>
                        <label className='desktop-md:text-2xl desktop:text-base font-bold  items-center '>{`
                        ${(idEscuelaSG[0]?.tipo_escuela==='')
                            ? `ESCUELA N° ${idEscuelaSG[0]?.numero} `
                            : (idEscuelaSG[0]?.tipo_escuela==='A')
                                ? `ANEXO DE EDUCACION ESPECIAL N° ${idEscuelaSG[0]?.numero}`
                                : (idEscuelaSG[0]?.tipo_escuela==='E')
                                    ? `ESCUELA DE CONFIGURACIONES DE APOYO N° ${idEscuelaSG[0]?.numero}`
                                    :(idEscuelaSG[0]?.tipo_escuela==='N')
                                        ? `ESCUELA ${idEscuelaSG[0]?.nombre_escuela}`
                                        : (idEscuelaSG[0]?.tipo_escuela==='F')
                                            ? `ESCUELA DE FRONTERA N° ${idEscuelaSG[0]?.numero}`
                                            : (idEscuelaSG[0]?.tipo_escuela==='SUP')
                                                ? `SUPERVISORES`
                                                : (idEscuelaSG[0]?.tipo_escuela==='SDR')
                                                    ? `SECRETARIA REGIONAL`
                                                    : ``

                        }

                        `}</label>
                    </div>
                    <div className='w-full desktop:flex flex-row movil:hidden bg-zinc-100 justify-center desktop-md:text-lg desktop:text-xs'>
                        <label className='font-bold mr-4'>{`LOCALIDAD: ${idEscuelaSG[0]?.localidad}`}</label>
                        <label className='font-bold mx-4'>{`DPTO: ${idEscuelaSG[0]?.departamento}`}</label>
                        <label className='font-bold mx-4'>{`REGION: ${idEscuelaSG[0]?.region}`}</label>
                        <label className='font-bold mx-4'>{`CAT: ${idEscuelaSG[0]?.categoria}`}</label>
                        <label className='font-bold mx-4'>{`MOD: ${idEscuelaSG[0]?.modalidad}`}</label>
                        <label className='font-bold ml-4'>{`ZONA: ${idEscuelaSG[0]?.zona}`}</label>
                    </div>
                </div>
                {/**PARTE DE DATOS TABLAS */}
                <div 
                    className={`overflow-y-auto border-[1px] border-black  transition-all duration-500  movil:w-[100vw] 
                                    ${(idEscuelaSG?.length==0)
                                        ?` h-[70vh]`
                                        :` h-[55vh]`
                                    }
                                `}
                >
                    <table>
                        <thead>
                            <tr className='sticky top-0 bg-zinc-200 border-b-[1px]  border-zinc-400 print:bg-zinc-200 print:force-color desktop:text-[10px] desktop-md:text-sm'>
                                <th className='border-[1px] border-zinc-600 w-[5vw] '>LEGAJO</th>
                                <th className='border-[1px] border-zinc-600 w-[7vw]'>DNI</th>
                                <th className='border-[1px] border-zinc-600 w-[25vw]'>NOMBRE</th>
                                <th className='border-[1px] border-zinc-600 w-[8vw]'>FECHA INGRESO</th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'>ESP</th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'>PTJE ANTERIOR</th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'>
                                    <div className='flex flex-col'>
                                        <label>A</label>
                                        <label>T y OT</label>
                                    </div>
                                </th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'>
                                    <div className='flex flex-col'>
                                        <label>B</label>
                                        <label>ANT IG</label>
                                    </div>
                                </th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'><div className='flex flex-col'>
                                        <label>C</label>
                                        <label>D. PROF</label>
                                    </div></th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'>
                                    <div className='flex flex-col'>
                                        <label>D</label>
                                        <label>RESID</label>
                                    </div>
                                </th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'>
                                    <div className='flex flex-col'>
                                        <label>E</label>
                                        <label>FC y OIF</label>
                                    </div>
                                </th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'>
                                    <div className='flex flex-col'>
                                        <label>F</label>
                                        <label>ANTEC</label>
                                    </div>
                                </th>
                                <th className='border-[1px] border-zinc-600 w-[5vw]'>Total</th>
                                {/* <th className='border-[1px]  border-zinc-400 w-[10vw]'>Notificado</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listadoSG?.map((docente, index)=>{
                                    return(
                                        <tr key={index} className='desktop-md:text-base desktop:text-xs'>
                                            <td className='border-[1px] border-b-[1px] border-zinc-400 w-[5vw] h-[4vh] text-center'>{docente.legajo}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[7vw] text-center'>{docente.dni}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[25vw] pl-2'>{docente.nombre}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[8vw] text-center'>{docente.fecha_ingreso}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.abreviatura}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.puntaje_anterior}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_a}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_b}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_c}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_d}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_e}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_f}</td>
                                            <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center bg-zinc-200 font-bold'>{docente.total}</td>
                                            {/* <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[10vw] text-center'>{}</td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/*PAGINADOR */}
            <div className="flex justify-center">
                <Paginador 
                    currentpage={paginacion.page}
                    totalpage={paginacion.totalPages}
                    onPageChange={handlePageChange}
                    totalItems={paginacion.totalItems}
                />
            </div>
        </div>
        }
    </div>
  )
})

export default PageLuom