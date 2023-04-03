import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import Auth from './components/Auth'
import Home from './components/Home'




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

