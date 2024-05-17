import React from 'react'
import TicTokToe from './pages/TicTokToe'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SingUp';
import PrivateRoute from './components/PrivateRoute';
import Offline from './pages/Offline';

const App = () => {
  return (
    <>
      {/* <TicTokToe /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path='/play/online' element={<TicTokToe />} />
          <Route path='/play/offline' element={<Offline />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;