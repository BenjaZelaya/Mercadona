import React, { useState, useEffect } from 'react'
import Card from '../Components/Card'

const LOCAL_STORAGE_KEY = 'mis-productos'

const VerProductos = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (data) {
      try {
        setProductos(JSON.parse(data))
      } catch (error) {
        console.error('❌ Error leyendo productos:', error)
      }
    }
  }, [])

  return (
    <div className="ver-productos-container" style={{ padding: '2rem' }}>
      <h2>📦 Productos disponibles</h2>
      <div className="cards-container">
        {productos.length === 0 ? (
          <p>No hay productos guardados.</p>
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
