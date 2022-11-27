import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recommendation from './pages/recommendation/Recommendation';
import Result from './pages/Result';
import Layout from './Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Recommendation/>}/>
          <Route path="/result" element={<Result/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
