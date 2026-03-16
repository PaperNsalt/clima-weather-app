import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';
import HomePage from '../src/pages/HomePage.jsx';
import AboutPage from '../src/pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx';
// import SettingsPage from './pages/SettingsPage.jsx';
import './App.css'

function App() {
 
  return (
    <>
    <NavBar/>
      <Routes>
        <Route  path='/' element={<HomePage />}/>
        <Route  path='about' element={<AboutPage />}/>
        <Route  path='contact' element={<ContactPage />}/>
        {/* <Route  path='settings' element={<SettingsPage />}/> */}
      </Routes>
      <Footer/>
    </>
  )
}

export default App
