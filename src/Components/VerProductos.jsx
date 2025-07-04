import React, { useState, useEffect } from 'react'
import Card from '../Components/Card'

const API_URL = 'http://localhost:3001/products' // URL de tu backend

const VerProductos = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(error => console.error('❌ Error cargando productos:', error))
  }, [])

  return (
    <div className="ver-productos-container" style={{ padding: '2rem' }}>
      <h2>📦 Productos disponibles</h2>
      <div className="cards-container">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map(producto => (
            <Card
              key={producto.id}
              title={producto.title}
              price={producto.price}
              image={producto.image}
              onAddToCart={() => alert(`Agregado: ${producto.title}`)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default VerProductos

