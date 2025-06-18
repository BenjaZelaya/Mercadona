import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Inicio from './Pages/Inicio'
import Registrarse from './Pages/Registrarse'
import Admin from './Pages/Admin'
import Carrito from './Pages/Carrito'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Carrito" element={<Carrito />} />
      </Routes>
    </Router>
  )
}

export default App

