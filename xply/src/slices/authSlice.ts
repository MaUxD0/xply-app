import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


// Definimos la forma de nuestro usuario
interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Intentamos cargar el usuario desde localStorage al iniciar
const loadUserFromStorage = (): User | null => {
  const userStr = localStorage.getItem('xply_user');
  return userStr ? JSON.parse(userStr) : null;
};

const initialState: AuthState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
};

// Creamos el slice - esto genera automáticamente actions y reducer
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action para hacer login
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Guardamos en localStorage para persistir la sesión
      localStorage.setItem('xply_user', JSON.stringify(action.payload));
    },
    
    // Action para hacer logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('xply_user');
    },
    
    // Action para actualizar el avatar
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = action.payload;
        localStorage.setItem('xply_user', JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateAvatar } = authSlice.actions;
export default authSlice.reducer;