import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Recommendation from './pages/recommendation/Recommendation';
import Result from './pages/Result';
import Layout from './Layout';

export default function App() {
  axios.defaults.baseURL = 'http://localhost:3001';

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
