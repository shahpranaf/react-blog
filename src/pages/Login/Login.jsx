import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import { useLoginMutation } from "../../store/apis/authApi";
import { setToken } from "../../store/slices/authSlice";
import "./login.css";

export default function Login() {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef?.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    /* Handle login Submit */
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ user, pwd }).unwrap();
            if (userData?.token) {
                await dispatch(setToken(userData?.token))
                setUser('')
                setPwd('')
                setTimeout(() => {
                    navigate('/')
                }, 100)
                toast.success("Logged in successfully");
            }
        } catch (err) {
            if (err?.message) {
                setErrMsg(err?.message);
            } else {
                setErrMsg('Login Failed');
            }
            errRef?.current?.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)
    const handlePwdInput = (e) => setPwd(e.target.value)

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label for="username">Username</label>
                <input type="text"
                    id="username"
                    className="loginInput"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    placeholder="Enter your email..."
                    required
                    name="username"
                />
                <label for="password">Password</label>
                <input
                    id="password"
                    className="loginInput"
                    name="password"
                    value={pwd}
                    onChange={handlePwdInput}
                    autoComplete="off"
                    type="password"
                    placeholder="Enter your password..."
                    required
                />
                <button className="loginButton">Login</button>

                <p ref={errRef} className={errMsg ? "errmsg" : ""} aria-live="assertive">{errMsg}</p>

            </form>
            <Link to="/register" className="loginRegisterButton">Register</Link>
        </div>
    );
}