import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
  comments?: Comment[];
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
  loading: boolean;
  error: string | null;
  currentPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null,
};

// Array de imágenes de videojuegos reales
const gameImages = [
  'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg', // GTA V
  'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg', // Witcher 3
  'https://media.rawg.io/media/games/5c0/5c0dd63002cb23f804aab327d40ef119.jpg', // Red Dead 2
  'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg', // Minecraft
  'https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg', // God of War
  'https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg', // Elden Ring
  'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg', // Cyberpunk
  'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', // Skyrim
  'https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg', // Zelda BOTW
  'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg', // Hollow Knight
];

// Async thunk para obtener posts de la API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const [postsRes, usersRes] = await Promise.all([
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10'),
    axios.get('https://jsonplaceholder.typicode.com/users'),
  ]);
  
  const posts: Post[] = postsRes.data.map((post: any, index: number) => {
    const user = usersRes.data.find((u: any) => u.id === post.userId);
    return {
      ...post,
      username: user?.username || 'Unknown',
      avatar: `https://i.pravatar.cc/100?img=${post.userId}`,
      images: [gameImages[index % gameImages.length]], // Usa imágenes de videojuegos reales
      likes: Math.floor(Math.random() * 10000),
    };
  });
  
  return posts;
});

// Async thunk para obtener comentarios
export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return { postId, comments: response.data };
  }
);

// Async thunk para crear un post
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
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: postData.title,
      body: postData.body,
      userId: postData.userId,
    });
    
    return {
      ...response.data,
      id: Date.now(),
      username: postData.username,
      avatar: postData.avatar,
      images: postData.images,
      likes: 0,
      comments: [],
    };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
      if (state.currentPost?.id === action.payload) {
        state.currentPost.likes += 1;
      }
    },
    
    setCurrentPost: (state, action: PayloadAction<number>) => {
      console.log('Buscando post ID:', action.payload);
      console.log(' Posts disponibles:', state.posts.map(p => ({ id: p.id, title: p.title })));
      const post = state.posts.find(p => p.id === action.payload);
      console.log('Post encontrado:', post ? post.title : 'NO ENCONTRADO');
      state.currentPost = post || null;
    },
    
    clearCurrentPost: (state) => {
      state.currentPost = null;
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
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
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
      });
  },
});

export const { likePost, setCurrentPost, clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;