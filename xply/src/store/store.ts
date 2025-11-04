import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';

// Configuramos el store de Redux con nuestros reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,     // Maneja autenticación y usuario
    posts: postsReducer,   // Maneja los posts del feed
  },
});

// Tipos para TypeScript - esto nos da autocompletado y type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;