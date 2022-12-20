import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Recommendation from './pages/recommendation/Recommendation';
import Result from './pages/Result';
import Layout from './Layout';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

export default function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
