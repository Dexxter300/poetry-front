import { lazy } from "react";
// import AdminPage from "pages/admin";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "pages/notFound";
import SharedLayout from "./sharedLayout/SharedLayout";
// import Feedback from "./feedback/feedback";

const AdminPage = lazy(() => import('../pages/admin'))
const Feedback = lazy(() => import("./feedback/Feedback"))

//make signin 
//make poetry add 
//make poetry page
//make feedback form 

export const App = () => {

  
  // const FeedbackPage = lazy(() => import('../pages/'))
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout/>}>
        <Route path="about" /> // index
          <Route path="poetry" />
          <Route path="poetry/:poetryId"/>
        <Route path="feedback" element={<Feedback/>}/>
        </Route>
        <Route path="/admin" element={<AdminPage />} />

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
