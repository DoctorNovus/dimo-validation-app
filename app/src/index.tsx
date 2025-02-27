import { DimoAuthProvider } from '@dimo-network/login-with-dimo';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DimoAuthProvider>
      <App />
    </DimoAuthProvider>
  </React.StrictMode>
);
