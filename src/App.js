import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Topbar from "./components/Topbar/Topbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Categories from "./components/Categories/Categories";

import { selectCurrentToken, selectCurrentUser } from "./store/slices/authSlice";
import 'react-toastify/dist/ReactToastify.css';
import AuthenticatedRoute from "./AuthenticatedRoute";
import { URL_SEGMENT } from "./utils/constant";

function App() {

  const currentToken = useSelector(selectCurrentToken); /* Current token needs to be passed as invalidate tags not working */
  const currentUser = useSelector(selectCurrentUser); /* Authenticate routes based on User Login status */

  return (
    <>
      <Topbar userToken={currentToken} />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path={`/${URL_SEGMENT.POSTS}`} element={<Homepage />} />
        <Route path={`/${URL_SEGMENT.REGISTER}`} element={currentUser ? <Homepage /> : <Register />} />
        <Route path={`/${URL_SEGMENT.LOGIN}`} element={currentUser ? <Homepage /> : <Login />} />
        <Route path={`/${URL_SEGMENT.POST}/:id`} element={<Single />} />
        <Route
          path="/write"
          element={
            <AuthenticatedRoute>
              <Write />
            </AuthenticatedRoute>
          }
        />
        <Route
          path={`/${URL_SEGMENT.SETTINGS}`}
          element={
            <AuthenticatedRoute>
              <Settings />
            </AuthenticatedRoute>
          }
        />
        <Route path={`/${URL_SEGMENT.CATEGORIES}`} element={<Categories />} />
      </Routes>
      <ToastContainer limit={1} hideProgressBar={true} autoClose={2000} />
    </>
  );
}

export default App;