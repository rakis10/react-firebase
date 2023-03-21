import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextConsumer } from './context/AuthContext'
import { AuthProvider } from './provider/AuthProvider';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);