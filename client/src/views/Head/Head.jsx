import React from 'react'
import logoprimaria from '../../assets/LOGO-PRIMARIA-JPCD.png';
import logoinicial from '../../assets/LOGO-INICIAL-JPCD.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const Head = () => {
  const dispatch = useDispatch();

  //ESTADOS GLOBALES
  const tipoLomSG = useSelector((state)=>state.config.tipoLom);
  const nivelSG = useSelector((state)=>state.config.nivel);


  useEffect(()=>{
    //console.log('que tiene tipoLomSG: ', tipoLomSG);
  },[tipoLomSG])

  return (
    <div className={`notranslate w-full h-full ${nivelSG === 1 ? 'bg-orange-300' : 'bg-blue-300'} flex flex-row `}>
        <div>
            {/**LOGO */}
        </div>
        <div className='w-full flex items-center justify-between ml-4 shadow-md'>
            {/* <label className=' movil:hidden w-[25vw] desktop:flex items-center justify-start text-lg font-semibold'>Sala Primaria - JPCD</label> */}
            <div className='w-[25vw] movil:hidden desktop:flex flex-row'>
              <img className="desktop:w-[40px] desktop:h-[40px]" src={nivelSG === 1 ? logoinicial : logoprimaria}/>
              <label className=' ml-2 movil:hidden w-[25vw] desktop:flex items-center justify-start text-lg font-semibold '
              >
                <span>
                  {nivelSG === 2 && 'Sala Primaria - JPCD'}
                  {nivelSG === 1 && 'Sala Inicial - JPCD'}
                </span>
              </label>
            </div>
            {(tipoLomSG==='d') && 
              <label className='desktop:w-[50vw] movil:w-full flex items-center justify-center font-bold desktop-md:text-2xl desktop:text-lg '>LOM INSTITUCIONAL <a className='font-extrabold text-green-600 px-2 animate-pulse drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]'>DEFINITIVO</a> 2026</label>
            }
            {(tipoLomSG==='p') && 
              <label className='desktop:w-[50vw] movil:w-full flex items-center justify-center font-bold desktop-md:text-2xl desktop:text-lg text-gray-900'>LOM INSTITUCIONAL PROVISORIO 2026</label>
            }
            
            <label className='movil:hidden desktop:flex w-[20vw] flex items-center justify-end font-bold text-base pr-4'>V 2.0</label>
        </div>
    </div>
  )
}

export default Head