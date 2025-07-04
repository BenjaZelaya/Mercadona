import React, { useEffect, useState } from 'react'
import Card from './Card'
import ProductForm from './ProductForm'
import '../Style/AdminProductos.css'

const API_URL = 'http://localhost:3001/products' // tu backend local

const AdminProductos = () => {
  const [products, setProducts] = useState([])

  // GET productos
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error al cargar productos:', err))
  }, [])

  // POST producto
  const handleAddProduct = (product) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(newProduct => setProducts(prev => [newProduct, ...prev]))
      .catch(err => console.error('Error al agregar producto:', err))
  }

  // DELETE producto
  const handleDeleteProduct = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id))
      })
      .catch(err => console.error('Error al eliminar producto:', err))
  }

  return (
    <div className="app-container">
      <h1>🛍️ Mi Tienda</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <div className="cards-container">
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: '1rem' }}>
            <Card
              title={product.title}
              price={product.price}
              image={product.image}
              onAddToCart={() => alert(`Agregado: ${product.title}`)}
            />
            <button
              style={{
                marginTop: '0.5rem',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => handleDeleteProduct(product.id)}
            >
              Eliminar Producto
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminProductos


