import React from 'react'
import '../Style/Card.css'

const Card = ({ title, price, image, onAddToCart }) => {
  return (
    <div className="card">
      <img
        src={image}
        alt={title}
        className="card__image"
        style= {{ objectFit: 'cover', width: '100%', height: '200px', borderRadius: '8px' }}
      />

      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__price">${price}</p>
        <button className="card__button" onClick={onAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default Card
