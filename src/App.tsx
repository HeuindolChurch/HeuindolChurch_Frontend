import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage  from './pages/LoginPage';
import MainPage from "./pages/MainPage";
import AccountPage from "./pages/AccountPage";
import AuthPage from "./pages/AuthPage";
import AccountEditPage from "./pages/AccountEditPage";
import AccountInitialPage from "./pages/AccountInitialPage";


function App() {
  return (
    <Router>
      <Routes>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/' element={<MainPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/init' element={<AccountInitialPage />} />
          <Route path='/auth' element={<AuthPage/> } />
          <Route path='/account/add' element={<AccountEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
