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
import PoetryPostPage from "pages/poetryPost";

const AdminPage = lazy(() => import('../pages/admin'))
const Feedback = lazy(() => import("./feedback/Feedback"))

///////// general tasks //////////// 
//ip tracker
//

export const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}> {/* style */}
          <Route path="about" /> // index
          <Route path="poetry" element={<PoetryList />} /> {/* add pagination + rebuild html (put div instead of ul and LINK instead of li) */}
          <Route path="poetry/:poetryId" element={<PoetryPostPage />} />
          <Route path="feedback" element={<Feedback />} /> {/*done (should double check) */}
          <Route path='blog' element={<BlogPage />} /> {/*almost finished (just add pagination) */}
          <Route path='blog/:postId' element={<BlogPostPage />} /> {/* almost done (only add "go back" btn) */}
        </Route>
        <Route path="/signin" element={<RestrictedRoute redirectTo="/admin" component={<Signin />} />} /> {/* done (should double check) */}
        <Route path="/admin" element={<PrivateRoute redirectTo="/signin" component={<AdminPage />} />} /> {/* add edit adn deleting existing posts fucn and  remake inbox*/}

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
