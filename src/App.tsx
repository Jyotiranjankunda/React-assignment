import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './FirstPage';
import SecondPageComponent1 from './SecondPageComponent1';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second1" element={<SecondPageComponent1 />} />
      </Routes>
    </Router>
  );
};

export default App;
