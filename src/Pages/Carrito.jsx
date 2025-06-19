import React, { useEffect, useState } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import Navbar from '../Components/Navbar';

const LOCAL_STORAGE_KEY_PRODUCTOS = 'mis-productos';
const LOCAL_STORAGE_KEY_CARRITO = 'carrito';

const Carrito = () => {
  const [productos, setProductos] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTOS);
    return stored ? JSON.parse(stored) : [];
  });

  const [carrito, setCarrito] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CARRITO);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const añadirAlCarrito = (producto) => {
    if (!carrito.find(p => p.id === producto.id)) {
      setCarrito([...carrito, producto]);
      alert(`${producto.title} añadido al carrito`);
    } else {
      alert(`${producto.title} ya está en el carrito`);
    }
  };

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter(p => p.id !== id));
  };

  const vaciarCarrito = () => {
    if (window.confirm('¿Estás seguro que querés vaciar el carrito?')) {
      setCarrito([]);
    }
  };

  const total = carrito.reduce((sum, item) => sum + item.price, 0);

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
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>
                  <Button variant="success" size="sm" onClick={() => añadirAlCarrito(p)}>Añadir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h2 className="mt-5">🛒 Carrito</h2>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Total: ${total.toFixed(2)}</h5>
          <Button variant="danger" onClick={vaciarCarrito}>Vaciar Carrito</Button>
        </div>
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
                <td>{p.title}</td>
                <td>${p.price.toFixed(2)}</td>
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


