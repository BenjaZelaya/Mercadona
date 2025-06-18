import React, { useState } from 'react'

const ProductForm = ({ onAddProduct }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !price || !imageFile) {
      alert('Completá todos los campos')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const newProduct = {
        id: Date.now(),
        title,
        price: parseFloat(price),
        image: reader.result
      }

      onAddProduct(newProduct)

      // Limpiar
      setTitle('')
      setPrice('')
      setImageFile(null)
      document.getElementById('imageInput').value = ''
    }

    reader.readAsDataURL(imageFile)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button type="submit">Agregar producto</button>
    </form>
  )
}

export default ProductForm
