import { createSlice, createAsyncThunk,} from '@reduxjs/toolkit';
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

// Async thunk para obtener posts de la API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const [postsRes, usersRes] = await Promise.all([
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10'),
    axios.get('https://jsonplaceholder.typicode.com/users'),
  ]);
  
  const posts: Post[] = postsRes.data.map((post: any) => {
    const user = usersRes.data.find((u: any) => u.id === post.userId);
    return {
      ...post,
      username: user?.username || 'Unknown',
      avatar: `https://i.pravatar.cc/100?img=${post.userId}`,
      images: [`https://picsum.photos/600/400?random=${post.id}`],
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
      const post = state.posts.find(p => p.id === action.payload);
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