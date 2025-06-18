import React, { useEffect, useState } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import Navbar from '../Components/Navbar';

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(storedProducts);

    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(storedCarrito);
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const añadirAlCarrito = (producto) => {
    if (!carrito.find(p => p.id === producto.id)) {
      setCarrito([...carrito, producto]);
    }
  };

  const quitarDelCarrito = (id) => {
    const actualizado = carrito.filter(p => p.id !== id);
    setCarrito(actualizado);
  };

  return (
    <>
    <Navbar />
    <Container className="py-5">
      <h2>Productos Disponibles</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio.toFixed(2)}</td>
              <td>
                <Button variant="success" size="sm" onClick={() => añadirAlCarrito(p)}>Añadir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="mt-5">🛒 Carrito</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio.toFixed(2)}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => quitarDelCarrito(p.id)}>Quitar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  );
};

export default Carrito;
