
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { checkSession } from './slices/authSlice';
import App from './App';
import './index.css';

// Componente que verifica la sesión al iniciar
function Root() {
  useEffect(() => {
    // Verificar si hay una sesión activa en Supabase
    store.dispatch(checkSession());
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
