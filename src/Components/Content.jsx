import React from "react";
import { Routes, Route } from "react-router-dom";
import Blog from "../Pages/Blog";
import Categories from "../Pages/Categories";
import Home from "../Pages/Home";
import DetailBlog from "../Pages/DetailBlog";
import Register from "../Authentication/Register";
import LoginPage from "../Authentication/LoginPage";
import FavArticle from "../Components/FavArticle";
import UserProfile from "../Pages/UserProfile";
import PostBlog from "../Pages/PostBlog";
import WriteBlog from "../Pages/PostBlogv2";
import Verify from "../Pages/Verify";
import ForgotPasswordForm from "../Authentication/ResetPass/ForgotPass";
import ResetPassword from "../Authentication/ResetPass/ResetPass";
import MyArticle from "../Pages/UserArticle";
import LikedArticle from "../Pages/LikedArticle";

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/Categories" element={<Categories />} />
      <Route path="/Blog/:id" element={<DetailBlog />} />
      <Route path="/FavArticle" element={<FavArticle />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/PostBlog" element={<WriteBlog />} />
      <Route path="/verification-change-email/:token" element={<Verify />} />
      <Route path="/ForgotPass" element={<ForgotPasswordForm />} />
      <Route path="/verification/:token" element={<Verify />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/user/article" element={<MyArticle />} />
      <Route path="/likedarticle" element={<LikedArticle />} />
    </Routes>
  );
}

export default Content;
