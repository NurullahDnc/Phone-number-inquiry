import React, { useState } from 'react';
import Navbar from '../comporents/admin/navbar/Navbar';
import { GiHamburgerMenu } from 'react-icons/gi';

const AdminLayout = ({ children }) => {

  return (

    <div className="flex  overflow-hidden h-[100vh] ">

      <Navbar />

      <div className=" overflow-auto flex-1 h-auto ml-5 mr-5 mt-16 ">

        {children}
      </div>

    </div >

  );
}

export default AdminLayout;
