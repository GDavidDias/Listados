import React, { useRef } from 'react'
import Head from '../Head/Head'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useState } from 'react'
import { useEffect } from 'react'
import PageLuom from '../../components/PageLuom/PageLuom'
import Footer from '../Footer/Footer'

const Home = () => {
    const[content, setContent]=useState(null);
    const contentRef = useRef(null);

    useEffect(()=>{
      //Al renderizar uso el content de pagina principal de luom provisional
        setContent(<PageLuom ref={contentRef} />);
        //setContent(<PruebaImp/>);
    },[])

  return (
    <div className='notranslate h-full w-full fixed'>
        {/**CONTENEDOR SUPERIOR */}
        <div className='w-full h-[5vh] ' >
            <Head/>
        </div>
        {/**CONTENEDOR BODY */}
        <div className='w-full h-[88vh] bg-amber-50' >
            {/**MENU */}
            <div className='w-full'>
                <Sidebar contentRef={contentRef} />
            </div>
            {/**CONENEDOR */}
            <div>
              {/* <PageLuom ref={contentRef} /> */}
              {content}
            </div>
        </div>
        {/**PIE DE PAGINA */}
        <div className='w-full h-[9vh]'>
          <Footer/>
        </div>
    </div>
  )
}

export default Home