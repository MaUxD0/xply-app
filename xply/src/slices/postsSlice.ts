// src/slices/postsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase, type Post } from '../supabaseClient';

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

// Fetch posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { getState }) => {
    const state = getState() as { auth: { user: { id: string } | null } };
    const userId = state.auth.user?.id;

    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Si hay usuario, verificar qué posts ha likeado
    if (userId) {
      const { data: likes } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', userId);

      const likedPostIds = new Set(likes?.map(l => l.post_id) || []);

      return posts.map(post => ({
        ...post,
        has_liked: likedPostIds.has(post.id),
      }));
    }

    return posts;
  }
);

// Create post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (data: { 
    title: string; 
    body: string; 
    images: File[]; 
    game?: string;
  }, { getState }) => {
    const state = getState() as { auth: { user: { id: string; username: string; avatar_url: string | null } | null } };
    const user = state.auth.user;
    
    if (!user) throw new Error('User not authenticated');

    // Subir imágenes a Storage
    const imageUrls: string[] = [];
    
    for (const image of data.images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(`posts/${fileName}`, image);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(`posts/${fileName}`);

      imageUrls.push(urlData.publicUrl);
    }

    // Crear post
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
        title: data.title,
        body: data.body,
        images: imageUrls,
        game: data.game || null,
      })
      .select()
      .single();

    if (error) throw error;

    return { ...post, has_liked: false };
  }
);

// Like/Unlike post
export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async (postId: number, { getState }) => {
    const state = getState() as { 
      auth: { user: { id: string } | null };
      posts: { posts: Post[] };
    };
    const userId = state.auth.user?.id;
    
    if (!userId) throw new Error('User not authenticated');

    const post = state.posts.posts.find(p => p.id === postId);
    const hasLiked = post?.has_liked;

    if (hasLiked) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) throw error;
    } else {
      // Like
      const { error } = await supabase
        .from('likes')
        .insert({ post_id: postId, user_id: userId });

      if (error) throw error;
    }

    return { postId, hasLiked: !hasLiked };
  }
);

// Fetch comments
export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return { postId, comments: data };
  }
);

// Add comment
export const addComment = createAsyncThunk(
  'posts/addComment',
  async (data: { postId: number; body: string }, { getState }) => {
    const state = getState() as { auth: { user: { id: string; username: string; avatar_url: string | null } | null } };
    const user = state.auth.user;
    
    if (!user) throw new Error('User not authenticated');

    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        post_id: data.postId,
        user_id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
        body: data.body,
      })
      .select()
      .single();

    if (error) throw error;

    return comment;
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: number, { getState }) => {
    const state = getState() as { 
      auth: { user: { id: string } | null };
      posts: { posts: Post[] };
    };
    const userId = state.auth.user?.id;
    const post = state.posts.posts.find(p => p.id === postId);
    
    if (!userId || post?.user_id !== userId) {
      throw new Error('Not authorized to delete this post');
    }

    // Eliminar imágenes del storage
    if (post.images.length > 0) {
      for (const imageUrl of post.images) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('post-images')
            .remove([`posts/${fileName}`]);
        }
      }
    }

    // Eliminar post (cascade eliminará likes y comments)
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;

    return postId;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.filteredPosts = state.selectedGame
          ? action.payload.filter(p => p.game === state.selectedGame)
          : action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      // Create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        if (!state.selectedGame || action.payload.game === state.selectedGame) {
          state.filteredPosts.unshift(action.payload);
        }
      })
      // Toggle like
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, hasLiked } = action.payload;
        
        const updatePost = (post: Post) => {
          if (post.id === postId) {
            post.has_liked = hasLiked;
            post.likes += hasLiked ? 1 : -1;
          }
        };

        state.posts.forEach(updatePost);
        state.filteredPosts.forEach(updatePost);
        if (state.currentPost?.id === postId) {
          updatePost(state.currentPost);
        }
      })
      // Fetch comments
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          (post as any).comments = comments;
          (post as any).comments_count = comments.length;
        }
        if (state.currentPost?.id === postId) {
          (state.currentPost as any).comments = comments;
          (state.currentPost as any).comments_count = comments.length;
        }
      })
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const postId = action.payload.post_id;
        
        const updatePost = (post: any) => {
          if (post.id === postId) {
            post.comments = post.comments || [];
            post.comments.push(action.payload);
            post.comments_count = post.comments.length;
          }
        };

        state.posts.forEach(updatePost);
        state.filteredPosts.forEach(updatePost);
        if (state.currentPost?.id === postId) {
          updatePost(state.currentPost);
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p.id !== action.payload);
        state.filteredPosts = state.filteredPosts.filter(p => p.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      });
  },
});

export const { setCurrentPost, clearCurrentPost, filterByGame } = postsSlice.actions;
export default postsSlice.reducer;