import React, { useEffect, useState } from 'react';
import { Button, Form, Table, Container } from 'react-bootstrap';
import Navbar from '../Components/Navbar';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    precio: ''
  });

  // Cargar productos desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('productos')) || [];
    setProducts(stored);
  }, []);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.id || !form.nombre || !form.precio) return alert('Todos los campos son obligatorios');

    const newProduct = { ...form, precio: parseFloat(form.precio) };

    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = newProduct;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      const exists = products.some(p => p.id === form.id);
      if (exists) return alert('ID ya existe');
      setProducts([...products, newProduct]);
    }

    setForm({ id: '', nombre: '', precio: '' });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(products[index]);
  };

  const handleDelete = (index) => {
    if (window.confirm('¿Eliminar este producto?')) {
      const filtered = [...products];
      filtered.splice(index, 1);
      setProducts(filtered);
    }
  };

  return (
    <>
    <Navbar/>
    <Container className="py-5">
      <h2 className="mb-4">Administrar Productos</h2>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" name="id" value={form.id} onChange={handleChange} disabled={editingIndex !== null} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" step="0.01" name="precio" value={form.precio} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editingIndex !== null ? 'Modificar Producto' : 'Agregar Producto'}
        </Button>
        {editingIndex !== null && (
          <Button variant="secondary" onClick={() => {
            setForm({ id: '', nombre: '', precio: '' });
            setEditingIndex(null);
          }} className="ms-2">Cancelar</Button>
        )}
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>${prod.precio.toFixed(2)}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(index)}>Editar</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  );
};

export default Admin;
