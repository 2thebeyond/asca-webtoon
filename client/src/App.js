import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearUser } from './Reducer/userSlice.js';
import firebase from './firebase.js';

import Heading from './Component/Heading.js';
import Footer from './Component/Footer.js'

import List from './Component/Post/List.js';
import Upload from './Component/Post/Upload.js';
import Detail from './Component/Post/Detail.js';
import Edit from './Component/Post/Edit.js';

import Login from './Component/User/Login.js';
import Register from './Component/User/Register';

import Home from  './Component/Home.js';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null){
        dispatch(loginUser(userInfo));
      } else {
        dispatch(clearUser());
      }
    });
  }, [])

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/list" element={<List />} /> */}
        <Route path="/story" element={<List type="story"/>} />
        <Route path="/comedy" element={<List type="comedy"/>} />
        <Route path="/action" element={<List type="action"/>} />
        <Route path="/fantasy" element={<List type="fantasy"/>} />
        <Route path="/romance" element={<List type="romance"/>} />
        <Route path="/life" element={<List type="life"/>} />
        <Route path="/poster" element={<List type="poster"/>} />
        {/* <Route path="/list" element={<List />} /> */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<Detail/>} />
        <Route path="/edit/:postNum" element={<Edit/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Footer/>
    </>
    
  );
}

export default App;
