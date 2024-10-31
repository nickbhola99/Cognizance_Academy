import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import SignUpPage from './pages/SignUpPage'
import UserPage from './pages/UserPage'
import StudyGuidePage from './pages/StudyGuidePage'
import NavBar from './components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/users/:username" element={<UserPage />} />
        <Route path="/guide/:id" element={<StudyGuidePage />} />
      </Routes>
    </div>
  )
}

export default App
