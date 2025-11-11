import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

// Obtener posts de la API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const [postsRes, usersRes] = await Promise.all([
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10'),
    axios.get('https://jsonplaceholder.typicode.com/users'),
  ]);
  
  const posts: Post[] = postsRes.data.map((post: any, index: number) => {
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
  
  return posts;
});

// Obtener comentarios de un post
export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return { postId, comments: response.data };
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
      likedBy: [],
      isLocal: true,
      comments: [],
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
        // Unlike
        post.likedBy = post.likedBy.filter(id => id !== userId);
        post.likes = Math.max(0, post.likes - 1);
      } else {
        // Like
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
      try {
        if (post.isLocal) {
          const localKey = 'xply_local_posts';
          const raw = localStorage.getItem(localKey);
          const localPosts: Post[] = raw ? JSON.parse(raw) : [];
          const idx = localPosts.findIndex(lp => lp.id === postId);
          if (idx !== -1) {
            localPosts[idx] = { ...localPosts[idx], likedBy: post.likedBy, likes: post.likes };
            localStorage.setItem(localKey, JSON.stringify(localPosts));
          }
        }
      } catch (e) {
        console.error('Failed to update local post likes', e);
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
        // Merge local posts persisted in localStorage so created posts survive reloads
        try {
          const localKey = 'xply_local_posts';
          const raw = localStorage.getItem(localKey);
          const localPosts: Post[] = raw ? JSON.parse(raw) : [];
    
          const normalizedLocal = localPosts.map((p) => ({
            ...p,
            likedBy: p.likedBy || [],
            images: p.images || [],
          }));

          state.posts = [...normalizedLocal, ...action.payload];
          state.filteredPosts = [...normalizedLocal, ...action.payload];
        } catch (e) {

          console.error('Failed to load local posts', e);
          state.posts = action.payload;
          state.filteredPosts = action.payload;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action) => {
  
        state.posts.unshift(action.payload);
        if (!state.selectedGame) {
          state.filteredPosts.unshift(action.payload);
        }


        try {
          const localKey = 'xply_local_posts';
          const raw = localStorage.getItem(localKey);
          const localPosts: Post[] = raw ? JSON.parse(raw) : [];
  
          localPosts.unshift(action.payload);
          localStorage.setItem(localKey, JSON.stringify(localPosts));
        } catch (e) {
          console.error('Failed to persist local post', e);
        }
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

export const { likePost, setCurrentPost, clearCurrentPost, filterByGame } = postsSlice.actions;
export default postsSlice.reducer;