import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { rehydrate } from './slices/authSlice';
import App from './App';
import './index.css';

// Rehidratamos explícitamente el estado de autenticación desde localStorage.

const stored = localStorage.getItem('xply_user');
if (stored) {
  try {
    store.dispatch(rehydrate(JSON.parse(stored)));
  } catch (e) {
    // Si la rehidratación falla por parse error, lo dejamos en consola pero no
    // interrumpimos el arranque de la app.
    console.error('Failed to rehydrate auth from localStorage', e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provider para hacer que el store esté disponible en toda la app */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
