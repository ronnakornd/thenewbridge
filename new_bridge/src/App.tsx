import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Layout from './Layout';
import Nopage from './pages/Nopage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Profile from './pages/Profile';
import Teach from './pages/Teach';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<Nopage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/teach" element={<Teach />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
