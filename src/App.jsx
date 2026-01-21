import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import HomePage from '../src/pages/HomePage.jsx';
import AboutPage from '../src/pages/AboutPage.jsx'
import './App.css'

function App() {
 
  return (
    <>
    <NavBar/>

      <Routes>
        <Route  path='/' element={<HomePage />}/>
        <Route  path='about' element={<AboutPage />}/>
      </Routes>
    </>
  )
}

export default App
