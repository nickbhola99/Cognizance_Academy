import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from '../../../fullstack/frontend/src/pages/HomePage'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import SignUpPage from './pages/SignUpPage'
import UserPage from './pages/UserPage'
import NavBar from './components/Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/users/:username" element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App
