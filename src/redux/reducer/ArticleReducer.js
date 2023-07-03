import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  article: [],
};

export const ArticleReducer = createSlice({
  name: "ArticleReducer",
  initialState,
  reducers: {
    getArticle: (state, action) => {
      state.article = [...state.article, ...action.payload];
    },
  },
});

export const makeArticle = (data, file) => {
  return async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    console.log(data);
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);

    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Article created successfully!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //   document.location.href = "/";
    } catch (error) {
      //   toast.error(error.message);
      toast.error("Error creating article, please try again!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error.response);
    }
  };
};

export const likeArticle = (articleId) => {
  return async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/like`,
        {
          BlogId: articleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("article sudah di like");
    } catch (error) {
      alert(error.response.data.err);
    }
  };
};

export const { getArticle } = ArticleReducer.actions;

export default ArticleReducer.reducer;
