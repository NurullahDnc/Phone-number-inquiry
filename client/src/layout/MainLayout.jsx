import React, { useState } from 'react'
import Navbar from '../comporents/navbar/Navbar'
import Footer from '../comporents/footer/Footer'

const MainLayout = ({ children }) => {



  return (
    <>
      <Navbar />
      {children}
      <Footer />

    </>
  )
}

export default MainLayout

