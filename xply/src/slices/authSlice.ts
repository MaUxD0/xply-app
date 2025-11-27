// src/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient';

interface User {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  rehydrated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  rehydrated: false,
  loading: false,
  error: null,
};

// Signup con Supabase
export const signup = createAsyncThunk(
  'auth/signup',
  async (data: { email: string; password: string; username: string; avatar?: File }) => {
    // 1. Registrar usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned from signup');

    let avatarUrl: string | null = null;

    // 2. Si hay avatar, subirlo PRIMERO
    if (data.avatar) {
      const fileExt = data.avatar.name.split('.').pop();
      const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(`avatars/${fileName}`, data.avatar);

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
      } else {
        const { data: urlData } = supabase.storage
          .from('post-images')
          .getPublicUrl(`avatars/${fileName}`);
        
        avatarUrl = urlData.publicUrl;
        console.log('Avatar uploaded successfully:', avatarUrl);
      }
    }

    // 3. Crear perfil en la tabla profiles con el avatar
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: data.email,
        username: data.username,
        avatar_url: avatarUrl,
      });

    if (profileError) throw profileError;

    // 4. Retornar el usuario CON el avatar_url correcto
    return {
      id: authData.user.id,
      email: data.email,
      username: data.username,
      avatar_url: avatarUrl,
    };
  }
);

// Login con Supabase
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // 1. Login con Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned from login');

    // 2. Obtener perfil del usuario
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;

    return {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      avatar_url: profile.avatar_url,
    };
  }
);

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
});

// Verificar sesión existente
export const checkSession = createAsyncThunk('auth/checkSession', async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) return null;

  // Obtener perfil
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) throw error;

  return {
    id: profile.id,
    email: profile.email,
    username: profile.username,
    avatar_url: profile.avatar_url,
  };
});

// Update avatar
export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (file: File, { getState }) => {
    const state = getState() as { auth: AuthState };
    const userId = state.auth.user?.id;
    
    if (!userId) throw new Error('No user logged in');

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    
    // Subir imagen
    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(`avatars/${fileName}`, file);

    if (uploadError) throw uploadError;

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(`avatars/${fileName}`);

    const avatarUrl = urlData.publicUrl;

    // Actualizar perfil
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId);

    if (updateError) throw updateError;

    return avatarUrl;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    rehydrate: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.rehydrated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.rehydrated = true;
        // Actualizar localStorage también
        localStorage.setItem('xply_user', JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.rehydrated = true;
        // Guardar en localStorage
        localStorage.setItem('xply_user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        // Limpiar localStorage
        localStorage.removeItem('xply_user');
      })
      // Check session
      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.rehydrated = true;
        // Guardar en localStorage si hay usuario
        if (action.payload) {
          localStorage.setItem('xply_user', JSON.stringify(action.payload));
        }
      })
      // Update avatar
      .addCase(updateAvatar.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar_url = action.payload;
          // Actualizar en localStorage también
          localStorage.setItem('xply_user', JSON.stringify(state.user));
        }
      });
  },
});

export const { rehydrate } = authSlice.actions;
export default authSlice.reducer;