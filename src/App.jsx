import React from 'react'
import { Route, Routes } from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import BlogList from './components/Blog/BlogList';
import BlogPage from './components/Blog/BlogPage';
import AddBlog from './components/Blog/AddBlog';
import LandingPage from './pages/LandingPage';
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
   return (
     <div>
       <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}></Route>
         <Route path="/register" element={<Register></Register>}></Route>
         <Route path="/login" element={<Login></Login>}></Route>
         <Route path="/blogs" element={<BlogList></BlogList>}></Route>
         <Route path="/blog/:blogId/" element={<BlogPage></BlogPage>}></Route>
         <Route path="/addblog" element={<AddBlog></AddBlog>}></Route>
       </Routes>
     </div>
   );
}

export default App