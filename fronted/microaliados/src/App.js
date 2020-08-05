import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Styles/App.css';

import Navigation from './components/layout/Navigation';
import Routes from './components/Routes/Routes';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
        <Routes/>
      </div>
    </Router>
  );
}

export default App;
