import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/main/Main.jsx';
import AuthForm from './components/auth/AuthForm';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main/>} />
        <Route path="/auth" element={<AuthForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
