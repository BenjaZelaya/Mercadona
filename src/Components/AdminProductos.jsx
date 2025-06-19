import React, { useState, useEffect } from 'react'
import Card from './Card'
import ProductForm from './ProductForm'
import '../Style/AdminProductos.css'

const LOCAL_STORAGE_KEY = 'mis-productos'

const AdminProductos = () => {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const handleAddProduct = (product) => {
    setProducts((prev) => [product, ...prev])
  }

  const handleDeleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
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

