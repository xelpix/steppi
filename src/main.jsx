import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// I decided to wrap in my StoreProvider just here.
import { StoreProvider } from 'easy-peasy';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // passing store={store} as value in ContextAPI
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
