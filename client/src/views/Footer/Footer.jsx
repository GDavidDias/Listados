import React from 'react'
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";

const Footer = () => {
  return (
    <div className='notranslate flex justify-center text-base bg-cyan-700 text-white'>
        <div className='flex flex-col items-center my-[5px]'>
            <div className='desktop:flex movil:hidden flex-row items-center font-semibold'>
                <SiGooglemaps className='mr-2'/>
                <label>{`Sala Primaria - JPCD - Direccion: Av. España N° 1630 (Barrio Centro) - San Salvador de Jujuy`}</label>
            </div>
            <div className='desktop:flex movil:hidden flex-row items-center  font-bold'>
                <FaPhoneVolume className='text-lg mr-2'/>
                <label className='text-xl mr-6'>{`Tel: 388 4045383`}</label>
                <MdOutlineMarkEmailRead className='text-2xl mr-2'/>
                <label className='text-xl'>{` jpcd.salaprimaria@jujuy.edu.ar`}</label>
            </div>
            <div className='movil:flex desktop:hidden'>
                <label className='text-xl'>SALA PRIMARIA - JPCD</label>
            </div>
        </div>
    </div>
  )
}

export default Footer