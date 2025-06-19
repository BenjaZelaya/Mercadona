import React, { useEffect, useState } from 'react';
import { Button, Form, Table, Container } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import AdminProductos from '../Components/AdminProductos';


const Admin = () => {

  return (
    <>
    <Navbar/>
      <AdminProductos/>
    </>
  );
};

export default Admin;
