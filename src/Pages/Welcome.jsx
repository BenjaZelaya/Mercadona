import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Style/Welcome.css'

const Welcome = () => {
  const navigate = useNavigate()

  const handleEnter = () => {
    navigate('/IniciarSesion') // Cambiá esto a la ruta que quieras
  }

  return (
    <div className="welcome-container">
      <div className="fog-overlay" />
      <h1 className="welcome-title">Bienvenido... al Mercadona</h1>
      <p className="welcome-subtitle">Donde el terror acecha entre las góndolas...</p>
      <button className="enter-button" onClick={handleEnter}>
        Entrar... si te atreves
      </button>
    </div>
  )
}

export default Welcome
