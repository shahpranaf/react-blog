import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectCurrentUser } from './store/slices/authSlice';
import { URL_SEGMENT } from './utils/constant';

/* Function to Authenticate Route */
const AuthenticatedRoute = ({ children }) => {
    const currentUser = useSelector(selectCurrentUser); /* Authenticate routes based on User Login status */
    return (
        currentUser ? (
            <>{children}</>
        ) : (
            <Navigate to={`/${URL_SEGMENT.LOGIN}`} />
        )
    )
}

export default AuthenticatedRoute