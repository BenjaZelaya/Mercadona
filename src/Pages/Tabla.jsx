import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import '../Style/Tabla.css';

const Tabla = () => {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [form, setForm] = useState({
    nombre: '',
    categoria: 'Comidas',
    precio: ''
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const nuevoProducto = {
      id: editIndex !== null ? productos[editIndex].id : Date.now(),
      nombre: form.nombre,
      categoria: form.categoria,
      precio: parseFloat(form.precio)
    };

    if (editIndex !== null) {
      const actualizados = [...productos];
      actualizados[editIndex] = nuevoProducto;
      setProductos(actualizados);
      setEditIndex(null);
    } else {
      setProductos([...productos, nuevoProducto]);
    }

    setForm({ nombre: '', categoria: 'Comidas', precio: '' });
  };

  const handleEditar = (index) => {
    const prod = productos[index];
    setForm({
      nombre: prod.nombre,
      categoria: prod.categoria,
      precio: prod.precio
    });
    setEditIndex(index);
  };

  const handleEliminar = (index) => {
    const filtrados = [...productos];
    filtrados.splice(index, 1);
    setProductos(filtrados);
    if (editIndex === index) {
      setForm({ nombre: '', categoria: 'Comidas', precio: '' });
      setEditIndex(null);
    }
  };

  const precioTotal = productos.reduce((sum, p) => sum + p.precio, 0);

  return (
    <>
    <Navbar/>
    <div className="tabla-bg">
      <Container className="tabla-contenido py-5">
        <h2 className="titulo">📋 Lista de Productos</h2>

        <Form onSubmit={handleSubmit} className="formulario">
          <Form.Group className="mb-3">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Select
              value={form.nombre}
              name="nombre"
              onChange={handleChange}
              className="mb-2"
            >
              <option value="">-- Elegí una opción o escribí abajo --</option>
              <option value="Milanesa Comun">Milanesa Comun</option>
              <option value="Milanesa Especial">Milanesa Especial</option>
              <option value="Papa Comun">Papa Comun</option>
              <option value="Papa Especial">Papa Especial</option>
              <option value="Pizza Comun">Pizza Comun</option>
              <option value="Pizza Especial">Pizza Especial</option>
              <option value="Lomito Comun">Lomito Comun</option>
              <option value="Lomito Especial">Lomito Especial</option>
              <option value="Bebida 500ml">Bebida 500ml</option>
              <option value="Bebida 1l">Bebida 1l</option>
              <option value="Bebida 1,5L">Bebida 1,5L</option>
              <option value="Bebida 2L">Bebida 2L</option>
              <option value="Cerveza">Cerveza</option>
            </Form.Select>

            <Form.Control
              type="text"
              placeholder="O escribí tu producto"
              value={form.nombre}
              name="nombre"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoria" value={form.categoria} onChange={handleChange}>
              <option value="Comidas">Comidas</option>
              <option value="Bebidas">Bebidas</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Ej: 250.00"
              step="0.01"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="boton-agregar">
            {editIndex !== null ? 'Guardar Cambios' : 'Agregar Producto'}
          </Button>
        </Form>

        {productos.length === 0 ? (
          <p className="mensaje-vacio">No hay productos añadidos.</p>
        ) : (
          <>
            <Table striped bordered hover responsive className="tabla-productos mt-4">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, index) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>${p.precio.toFixed(2)}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditar(index)}
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(index)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h5 className="total mt-3">💰 Total: ${precioTotal.toFixed(2)}</h5>
          </>
        )}
      </Container>
    </div>
    </>
  );
};

export default Tabla;
