import { lazy } from "react";
// import AdminPage from "pages/admin";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "pages/notFound";
import SharedLayout from "./sharedLayout/SharedLayout";
import PoetryList from "pages/poetryList";
import Signin from "pages/signin";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
// import Feedback from "./feedback/feedback";
import { useEffect } from "react";
import BlogPage from "pages/blog";
import BlogPostPage from "pages/blogPost";

const AdminPage = lazy(() => import('../pages/admin'))
const Feedback = lazy(() => import("./feedback/Feedback"))

//make signin 
//make poetry add 
//make poetry page
//make feedback form 

export const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="about" /> // index
          <Route path="poetry" element={<PoetryList />} />
          <Route path="poetry/:poetryId" />
          <Route path="feedback" element={<Feedback />} />
          <Route path='blog' element={<BlogPage />} />
          <Route path='blog/:postId' element={<BlogPostPage />} />
        </Route>
        <Route path="/signin" element={<RestrictedRoute redirectTo="/admin" component={<Signin />} />} />
        <Route path="/admin" element={<PrivateRoute redirectTo="/signin" component={<AdminPage />} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    // <div
    //   style={{
    //     height: '100vh',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     fontSize: 40,
    //     color: '#010101'
    //   }}

    // >
    //   React homework template
    // </div>
  );
};
