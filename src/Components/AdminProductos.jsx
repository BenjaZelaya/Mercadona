import React, { useState, useEffect } from 'react'
import Card from './Card'
import ProductForm from './ProductForm'
import '../Style/AdminProductos.css'

const LOCAL_STORAGE_KEY = 'mis-productos'

const AdminProductos = () => {
  const [products, setProducts] = useState([])

  // Cargar productos desde localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY)
    console.log('📦 Leyendo localStorage:', storedProducts)

    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts))
      } catch (e) {
        console.error('❌ Error al parsear localStorage:', e)
      }
    }
  }, [])

  // Guardar productos en localStorage
  useEffect(() => {
    console.log('💾 Guardando en localStorage:', products)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const handleAddProduct = (product) => {
    console.log('➕ Nuevo producto:', product)
    setProducts((prev) => [product, ...prev])
  }

  return (
    <div className="app-container">
      <h1>🛍️ Mi Tienda</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <div className="cards-container">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            onAddToCart={() => alert(`Agregado: ${product.title}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default AdminProductos
