import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './NavBar'
import './Signin.css'

const userDetails = {
  email: '',
  password: '',
}

export default function SignIn({ user, setUser }) {
  const [state, setState] = useState(userDetails)
  const { email, password } = state
  const navigate = useNavigate()
  function handleInput(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  async function handleSignIn(e) {
    e.preventDefault()
    try {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        toast.success('Signed In successfully!')
        navigate('/')
      }
    } catch (error) {
      toast.error('Sign In failed. Please check your email or password.')
    }
  }

  return (
      <div className="signin-cont">
        <form onSubmit={handleSignIn} className="signin-form">
          <p className="welcome">Welcome!</p>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
            required
          />

          <Link to="#" className="f-password">
            Forgot password?
          </Link>
          <button className="signin-btn">Sign in</button>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
  )
}
