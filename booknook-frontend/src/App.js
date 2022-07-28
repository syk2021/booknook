import React from 'react';
import Navbar from "./Navbar";
import Home from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import PostListPage from './pages/PostListPage';
import { Route, Routes } from 'react-router-dom';
import AppStateProvider from './providers/AppStateProvider';
import './App.css';
// helmet sets meta tag
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
    <AppStateProvider>
      <Helmet>
        <title>BOOKNOOK</title>
      </Helmet>
      <Navbar />
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
        <Route exact path = "/search" element = {<SearchPage/>}/>
        <Route exact path = "/register" element={<RegisterPage/>}/>
        <Route exact path = "/login" element={<LoginPage/>}/>
        <Route exact path = "/cart" element={<CartPage/>}/>
        <Route exact path = "/write" element={<WritePage/>}/>
        <Route exact path = "/@:username/:postId" element={<PostPage/>}/>
        <Route exact path = "/@:username" element={<PostListPage/>}/>
      </Routes>
    </AppStateProvider>
    </>
  );
};


export default App;