import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import logo from './logo.svg';
import GlobalStyle from './styles/global';

// import './App.css';

import Routes from './routes';

const App: React.FC = () => (
  <Router>

      <Routes />
      <GlobalStyle />

  </Router>
);

export default App;
