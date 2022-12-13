import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './pages/layouts/Navbar';
import Home from './pages/Home';
import Links from './pages/Links';
import Download from './pages/Download';
import Contact from './pages/Contact';
import HowToUse from './pages/HowToUse';
import NoPage from './pages/NoPage';
import Test from './pages/Test';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="links" element={<Links />} />
          <Route path="how-to-use" element={<HowToUse />} />
          <Route path="contact" element={<Contact />} />
          <Route path="download/:fileId" element={<Download />} />
          <Route path="test" element={<Test />} />
          <Route path="*" element={<NoPage />} />
          {/* <Route path="test" element={<Test />} />
          <Route path="posts" element={<Posts />} />
          <Route path="new-post" element={<NewPost />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={(token) ? <Navigate replace to="/" /> : <Register />} />
          <Route path="login" element={(token) ? <Navigate replace to="/" /> : <Login />} />
          <Route path="new-post" element={<NewPost />} />
          <Route path="post/:title" element={<SinglePost />} />
          <Route path="user/:user" element={<UserMeta />} />
          <Route path="edit-post/:title" element={<EditPost />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
