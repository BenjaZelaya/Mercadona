import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Inicio from './Pages/Inicio'
import Registrarse from './Pages/Registrarse'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrarse" element={<Registrarse />} />
      </Routes>
    </Router>
  )
}

export default App

