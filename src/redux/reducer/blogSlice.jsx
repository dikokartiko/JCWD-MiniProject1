import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://minpro-blog.purwadhikabootcamp.com/api/blog";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get(`${BASE_URL}/?size=10`);
  return response.data.result;
});

export const fetchCategories = createAsyncThunk(
  "blogs/fetchCategories",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allCategory`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchBlogId = createAsyncThunk("blogs/fetchBlogId", async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log(response.data[0]);
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blog: [],
    blogId: [],
    blogs: [],
    categories: [],
    status: "idle",
    error: null,
    totalPages: 0,
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blog = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBlogId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogId = action.payload;
      })
      .addCase(fetchBlogId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setBlogs, setTotalPages } = blogSlice.actions;
export const selectBlogs = (state) => state.blogs.blogs;
export const categoriesBlogs = (state) => state.blogs.categories;
export default blogSlice.reducer;
