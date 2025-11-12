import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { savePostsToDB, loadPostsFromDB, saveCommentToDB, loadCommentsFromDB } from '../../utils/indexedDB';

// Definimos la estructura de un post
export interface Post {
  id: number;
  userId: number;
  username: string;
  avatar: string;
  title: string;
  body: string;
  images: string[];
  likes: number;
  likedBy?: number[];
  isLocal?: boolean;
  comments?: Comment[];
  game?: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  avatar?: string;
}

interface PostsState {
  posts: Post[];
  filteredPosts: Post[];
  selectedGame: string | null;
  loading: boolean;
  error: string | null;
  currentPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  selectedGame: null,
  loading: false,
  error: null,
  currentPost: null,
};

// Array de juegos con sus imágenes
const gamesData = [
  { name: 'GTA V', image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg' },
  { name: 'GTA V', image: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg' },
  { name: 'Alan Wake', image: 'https://media.rawg.io/media/games/5c0/5c0dd63002cb23f804aab327d40ef119.jpg' },
  { name: 'BioShock infinite', image: 'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg' },
  { name: 'Horizon Zero Dawn', image: 'https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg' },
  { name: 'Fallout 4', image: 'https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg' },
  { name: 'Skyrim', image: 'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg' },
  { name: 'The Witcher 3', image: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg' },
  { name: 'Rocket League', image: 'https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg' },
  { name: 'Tomb Raider', image: 'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg' },
];

// Obtener posts de la API + posts locales
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  // Primero cargamos los posts locales de IndexedDB
  const localPosts = await loadPostsFromDB();
  
  // Luego cargamos los posts de la API
  const [postsRes, usersRes] = await Promise.all([
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10'),
    axios.get('https://jsonplaceholder.typicode.com/users'),
  ]);
  
  const apiPosts: Post[] = postsRes.data.map((post: any, index: number) => {
    const user = usersRes.data.find((u: any) => u.id === post.userId);
    const gameData = gamesData[index % gamesData.length];
    
    return {
      ...post,
      username: user?.username || 'Unknown',
      avatar: `https://i.pravatar.cc/100?img=${post.userId}`,
      images: [gameData.image],
      likes: Math.floor(Math.random() * 10000),
      likedBy: [],
      game: gameData.name,
    };
  });
  
  // Retornamos ambos: locales primero, luego API
  return {
    localPosts: localPosts.map((p: Post) => ({
      ...p,
      likedBy: p.likedBy || [],
      images: p.images || [],
    })),
    apiPosts
  };
});

// Obtener comentarios de un post (API + locales)
export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    // Primero cargamos comentarios locales
    const localComments = await loadCommentsFromDB(postId);
    
    // Luego intentamos cargar de la API 
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return { 
        postId, 
        comments: [...localComments, ...response.data]
      };
    } catch {
      // Si falla , solo retornamos comentarios locales
      return { 
        postId, 
        comments: localComments
      };
    }
  }
);

// Agregar un comentario
export const addComment = createAsyncThunk(
  'posts/addComment',
  async (commentData: { 
    postId: number;
    name: string;
    email: string;
    body: string;
    avatar?: string; // Agregamos el avatar
  }) => {
    const newComment = {
      postId: commentData.postId,
      name: commentData.name,
      email: commentData.email,
      body: commentData.body,
      avatar: commentData.avatar, // Guardamos el avatar
    };
    
    // Guardar en IndexedDB
    const commentId = await saveCommentToDB(newComment);
    
    return {
      ...newComment,
      id: commentId,
    };
  }
);

// Crear un nuevo post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: { 
    title: string; 
    body: string; 
    images: string[]; 
    userId: number; 
    username: string; 
    avatar: string 
  }) => {
    // Simulamos la llamada a la API pero no usamos la respuesta
    await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: postData.title,
      body: postData.body,
      userId: postData.userId,
    });
    
    return {
      id: Date.now(),
      userId: postData.userId,
      username: postData.username,
      avatar: postData.avatar,
      title: postData.title || '',
      body: postData.body || '',
      images: postData.images || [],
      likes: 0,
      likedBy: [],
      isLocal: true,
      comments: [],
      game: undefined, // Aseguramos que sea undefined, no null
    };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<{ postId: number; userId: number }>) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (!post) return;

      post.likedBy = post.likedBy || [];
      const alreadyLiked = post.likedBy.includes(userId);

      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter(id => id !== userId);
        post.likes = Math.max(0, post.likes - 1);
      } else {
        post.likedBy.push(userId);
        post.likes = (post.likes || 0) + 1;
      }

      if (state.currentPost?.id === postId) {
        state.currentPost.likedBy = post.likedBy;
        state.currentPost.likes = post.likes;
      }
      const filteredPost = state.filteredPosts.find(p => p.id === postId);
      if (filteredPost) {
        filteredPost.likedBy = post.likedBy;
        filteredPost.likes = post.likes;
      }
      
      // SOLO guardamos si el post es LOCAL y creamos una copia limpia
      if (post.isLocal) {
        const localPosts = state.posts
          .filter(p => p.isLocal)
          .map(p => ({
            id: p.id,
            userId: p.userId,
            username: p.username,
            avatar: p.avatar,
            title: p.title,
            body: p.body,
            images: [...(p.images || [])],
            likes: p.likes,
            likedBy: [...(p.likedBy || [])],
            isLocal: true,
            comments: (p.comments || []).map(c => ({
              id: c.id,
              postId: c.postId,
              name: c.name,
              email: c.email,
              body: c.body,
              avatar: c.avatar,
            })),
            game: p.game,
          }));
        
        savePostsToDB(localPosts).catch(e => 
          console.error('Failed to update posts in IndexedDB', e)
        );
      }
    },
    
    setCurrentPost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload);
      state.currentPost = post || null;
    },
    
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    
    filterByGame: (state, action: PayloadAction<string | null>) => {
      state.selectedGame = action.payload;
      
      if (!action.payload) {
        state.filteredPosts = state.posts;
      } else {
        state.filteredPosts = state.posts.filter(
          post => post.game === action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        
        // Combinamos posts locales (primero) + posts de la API (después)
        const allPosts = [...action.payload.localPosts, ...action.payload.apiPosts];
        
        state.posts = allPosts;
        state.filteredPosts = allPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        // Agregar el nuevo post al inicio
        state.posts.unshift(action.payload);
        if (!state.selectedGame) {
          state.filteredPosts.unshift(action.payload);
        }

        // GUARDAMOS en IndexedDB con imágenes completas
        const localPosts = state.posts.filter(p => p.isLocal);
        savePostsToDB(localPosts).catch(e => 
          console.error('Failed to persist post in IndexedDB', e)
        );
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.comments = comments;
        }
        if (state.currentPost?.id === postId) {
          state.currentPost.comments = comments;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // AGREGAR el comentario al post
        const { postId } = action.payload;
        
        // Actualizar en el array de posts
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.comments = post.comments || [];
          post.comments.push(action.payload);
        }
        
        // Actualizar en currentPost
        if (state.currentPost?.id === postId) {
          state.currentPost.comments = state.currentPost.comments || [];
          state.currentPost.comments.push(action.payload);
        }
        
        // Actualizar en filteredPosts
        const filteredPost = state.filteredPosts.find(p => p.id === postId);
        if (filteredPost) {
          filteredPost.comments = filteredPost.comments || [];
          filteredPost.comments.push(action.payload);
        }
      });
  },
});

export const { likePost, setCurrentPost, clearCurrentPost, filterByGame } = postsSlice.actions;
export default postsSlice.reducer;