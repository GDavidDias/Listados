import React from 'react';
import logoJujuy from '../../assets/logo-jujuy.jpeg';

const ReporteLuomInstitucional = ({datosEscuela, datosLuom,contentRef}) => {

    //console.log('>> que ingresa por datosEscuela: ',  datosEscuela);
    //console.log('>> que ingresa por datosLuom: ', datosLuom);

  return (
    <div className='notranslate w-full h-full p-2  '>
        <div
            ref={contentRef}
        >
            {/**PARTE DE DATOS TABLAS */}
            <div className='body-print flex flex-col'>
                <table className=''>
                    <thead>
                        <tr>
                            <th colSpan={14} className='border-b border-zinc-400 pb-2' >
                                {/**ENCABEZADO DE TABLA */}
                                {(datosEscuela?.length!=0) &&
                                <div 
                                    className='w-full flex flex-col border-t-[1px] border-x-[1px] border-zinc-400 pb-[1mm] print-header'
                                >
                                    {/**TITULOS */}
                                    <div className='flex flex-row'>
                                        {/**LOGO JUJUY */}
                                        <div className="w-[25%] flex ">
                                            <img src={logoJujuy} className='w-[30%]'/>
                                        </div>
                                        {/**TITULO */}
                                        <div className="w-[50%] flex justify-center font-bold text-2xl ">
                                            <label>LOM INSTITUCIONAL 2025</label>
                                        </div>
                                        {/**IMAGEN DERECHA */}
                                        <div className="w-[25%] flex justify-end">
                                            {/* <img src=''/> */}
                                            <div className='flex flex-col items-center mr-2 '>
                                                <label className='text-xs '>JUNTA PROVINCIAL DE CALIFICACION DOCENTE</label>
                                                <label className=' text-sm'>SALA PRIMARIA</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/**DATOS DE ESCUELA */}
                                    <div className=' flex bg-zinc-100 justify-center items-center'>
                                        {/* <label className='text-lg font-bold  items-center '>{`
                                            ESCUELA N° ${datosEscuela[0]?.numero}
                                        `}</label> */}
                                        <label className='text-lg font-bold  items-center '>{`
                                            ${(datosEscuela[0]?.tipo_escuela==='')
                                                ? ` ESCUELA N° ${datosEscuela[0]?.numero} `
                                                : (datosEscuela[0]?.tipo_escuela==='A')
                                                    ? `ANEXO DE EDUCACION ESPECIAL N° ${datosEscuela[0]?.numero}`
                                                    : (datosEscuela[0]?.tipo_escuela==='E')
                                                        ? `ESCUELA DE CONFIGURACIONES DE APOYO N° ${datosEscuela[0]?.numero}`
                                                        :(datosEscuela[0]?.tipo_escuela==='N')
                                                            ? ` ESCUELA ${datosEscuela[0]?.nombre_escuela}`
                                                            : (datosEscuela[0]?.tipo_escuela==='F')
                                                                ? `ESCUELA DE FRONTERA N° ${datosEscuela[0]?.numero}`
                                                                : (datosEscuela[0]?.tipo_escuela==='SUP')
                                                                    ? `SUPERVISORES`
                                                                    : (datosEscuela[0]?.tipo_escuela==='SDR')
                                                                        ? `SECRETARIA REGIONAL`
                                                                        : ``

                                            }
                                        `}</label>
                                    </div>
                                    <div className='w-full flex flex-row bg-zinc-100 justify-center '>
                                        <label className='text-lg font-bold mr-4'>{`LOCALIDAD: ${datosEscuela[0]?.localidad}`}</label>
                                        <label className='text-lg font-bold mx-4'>{`DPTO: ${datosEscuela[0]?.departamento}`}</label>
                                        <label className='text-lg font-bold mx-4'>{`REGION: ${datosEscuela[0]?.region}`}</label>
                                        <label className='text-lg font-bold mx-4'>{`CAT: ${datosEscuela[0]?.categoria}`}</label>
                                        <label className='text-lg font-bold mx-4'>{`MOD: ${datosEscuela[0]?.modalidad}`}</label>
                                        <label className='text-lg font-bold ml-4'>{`ZONA: ${datosEscuela[0]?.zona} %`}</label>
                                    </div>
                                    <div className='flex justify-end  items-end mb-0  '>
                                        <label className='text-sm mr-2 italic font-ligth '>Pagina:_____</label>
                                    </div>
                                </div>
                                }
                            </th>
                        </tr>
                        <tr className='sticky top-0 bg-zinc-100 border-b-[1px] text-xs border-zinc-400 print:bg-zinc-200 print:force-color mt-0 '>
                            <th className='border-[1px] border-zinc-400 w-[5vw] '>LEGAJO</th>
                            <th className='border-[1px] border-zinc-400 w-[7vw]'>DNI</th>
                            <th className='border-[1px] border-zinc-400 w-[25vw]'>APELLIDO Y NOMBRE</th>
                            <th className='border-[1px] border-zinc-400 w-[8vw]'>FECHA INGRESO</th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'>ESP</th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'>PUNTAJE ANTERIOR</th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'>
                                <div className='flex flex-col'>
                                    <label>A</label>
                                    <label>T y OT</label>
                                </div>
                            </th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'>
                                <div className='flex flex-col'>
                                    <label>B</label>
                                    <label>ANT IG</label>
                                </div>
                            </th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'><div className='flex flex-col'>
                                    <label>C</label>
                                    <label>D. PROF</label>
                                </div></th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'>
                                <div className='flex flex-col'>
                                    <label>D</label>
                                    <label>RESID</label>
                                </div>
                            </th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'>
                                <div className='flex flex-col'>
                                    <label>E</label>
                                    <label>FC y OIF</label>
                                </div>
                            </th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'>
                                <div className='flex flex-col'>
                                    <label>F</label>
                                    <label>ANTEC</label>
                                </div>
                            </th>
                            <th className='border-[1px] border-zinc-400 w-[5vw]'>TOTAL</th>
                            <th className='border-[1px]  border-zinc-400 w-[10vw]'>NOTIFICADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datosLuom?.map((docente, index)=>{
                                return(
                                    <tr key={index} className='text-base'>
                                        <td className='border-[1px] border-b-[1px] border-zinc-400 w-[5vw] h-[4vh] text-center'>{docente.legajo}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[7vw] text-center'>{docente.dni}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[25vw] pl-2'>{docente.nombre}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[8vw] text-center'>{docente.fecha_ingreso}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.abreviatura}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center font-bold'>{docente.puntaje_anterior}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_a}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_b}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_c}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_d}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_e}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center'>{docente.item_f}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[5vw] text-center font-bold'>{docente.total}</td>
                                        <td className='border-r-[1px] border-b-[1px] border-zinc-400 w-[10vw] text-center'>{}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            {/* <div className='footer-print print:block hidden border-2 border-red-500'>
                <label className=''>Pagina:_____</label>
            </div> */}
            </div>
        </div>
    </div>
    
  )
}

export default ReporteLuomInstitucional