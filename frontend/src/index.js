import React from 'react';
import { render } from 'react-dom'; // Import render method
import App from './App';
import { AuthProvider } from './Context/auth';


const root = document.getElementById('root');
render(
  
    <AuthProvider>
      <App />
    </AuthProvider>
  ,
  root
);
