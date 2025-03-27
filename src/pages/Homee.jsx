import React from 'react'
import CirculoLogo from '../components/CirculoLogo'
import Asmabout from '../components/Asmabout'
import Asmsetup from '../components/Asmsetup'
import Footer from '../components/Footer'
import ExampleSelector from '../components/ExampleSelector'
import ExampleDetail from '../components/ExampleDetail'



function Home() {
  return (
    <div>
        <CirculoLogo />
        <Asmabout />
        <Asmsetup />
        <ExampleSelector />
        <Footer />
    </div>
  )
}

export default Home