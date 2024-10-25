import React from 'react';
import './App.css';
import BILL from './nine/bill';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bill" element={<BILL />} />
      </Routes>
    </Router>
  );
}

export default App;