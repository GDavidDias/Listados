import React from 'react'
import logo from '../../assets/LOGO-PRIMARIA-JPCD.png';


const Head = () => {
  return (
    <div className='notranslate w-full h-full bg-blue-300 flex flex-row'>
        <div>
            {/**LOGO */}
        </div>
        <div className='w-full flex items-center justify-between ml-4'>
            {/* <label className=' movil:hidden w-[25vw] desktop:flex items-center justify-start text-lg font-semibold'>Sala Primaria - JPCD</label> */}
            <div className='w-[25vw] movil:hidden desktop:flex flex-row'>
              <img className="desktop:w-[40px] desktop:h-[40px]" src={logo}/>
              <label className=' ml-2 movil:hidden w-[25vw] desktop:flex items-center justify-start text-lg font-semibold'>Sala Primaria - JPCD</label>
            </div>
            <label className='desktop:w-[50vw] movil:w-full flex items-center justify-center font-bold desktop-md:text-2xl desktop:text-lg '>LOM INSTITUCIONAL 2025</label>
            <label className='movil:hidden desktop:flex w-[20vw] flex items-center justify-end font-bold text-base pr-4'>V 1.0</label>
        </div>
    </div>
  )
}

export default Head