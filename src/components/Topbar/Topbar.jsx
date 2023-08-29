import * as React from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import Loader from 'react-fullpage-custom-loader';

import { useFetchCurrentUserQuery, useLogoutUserMutation } from "../../store/apis/authApi";
import { URL_SEGMENT } from "../../utils/constant";

import "./topbar.css";

export default function Topbar({ userToken }) {
  let { data: currentUser, isLoading, isError, refetch } = useFetchCurrentUserQuery();
  const [logoutUser] = useLogoutUserMutation();

  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location?.pathname === `/${URL_SEGMENT.LOGIN}` 

  useEffect(() => {
    const fetchApi = async () => {
      await refetch();
    }
    fetchApi();
  }, [userToken, refetch])

  if (!isLoading && isError) {
    currentUser = null;
  }

  if (isLoading) {
    return <Loader sentences={[]} />;
  }


  const handleLogout = async () => {
    await logoutUser(currentUser?.id)
    navigate(URL_SEGMENT.LOGIN);
    toast.success("You have been logged out successfully");
  }

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList" data-testid="menu">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="#">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="#">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to={`/${URL_SEGMENT.WRITE}`}>
              WRITE
            </Link>
          </li>
          {currentUser 
            && 
            <li className="topListItem" onClick={handleLogout}>
              <Link className="link" to="#">
                LOGOUT
              </Link>
            </li>
          }
        </ul>
      </div>
      <div className="topRight">
        {currentUser ? (
          <Link className="link" to={`/${URL_SEGMENT.SETTINGS}`}>
            <img
              className="topImg"
              src={currentUser?.avatar_urls["96"]}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            {!isLoginPage && <li className="topListItem">
              <Link className="link" to={`/${URL_SEGMENT.LOGIN}`}>
                LOGIN
              </Link>
            </li>
            }
            <li className="topListItem">
              <Link className="link" to={`/${URL_SEGMENT.REGISTER}`}>
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}