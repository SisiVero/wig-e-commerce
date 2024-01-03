import React, { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaGoogle } from 'react-icons/fa'
import { collection, doc, setDoc } from 'firebase/firestore'

const userDetails = {
  fullName: '',
  email: '',
  password: '',
  confrimPassword: '',
}

export default function SignUp() {
  const [state, setState] = useState(userDetails)
  const { fullName, email, password, confirmPassword } = state
  const navigate = useNavigate()

  function handleInput(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  async function handleAuth(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert('Password Do not match!!')
    }
    if (fullName && email && password && confirmPassword) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(user, { displayName: fullName })
      const userRole = {
        userName: fullName,
        role: 'user',
      }

      const users = {
        userName: fullName,
        email: email,
        cartItems: [],
      }

      const userRoleDocRef = doc(collection(db, 'userRole'), user.uid)
      await setDoc(userRoleDocRef, userRole)

      const userDocRef = doc(collection(db, 'users'), user.uid)
      await setDoc(userDocRef, users)

      toast.success('Account created successfully!')
      navigate('/')
    } else {
      return toast.warning('All feilds are required!')
    }
  }

  return (
    <div className="signup-cont">
      <div className="image-cont">
        <h2>Wig Dealers</h2>
        <p>Discover and see beautiful wigs</p>
      </div>
      <div className="signup-form-cont">
        <form onSubmit={handleAuth} className="signup-form">
          <p className="form-header">Create an account</p>
          <label>Full Name</label>
          <input
            type="name"
            name="fullName"
            value={fullName}
            onChange={handleInput}
            required
          />

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

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInput}
            required
          />
          <button className="signup-btn">Sign up</button>
          <div className="or">
            <span className="line" /> or <span className="line" />
          </div>
          <button className="signup-google">
            <FaGoogle className="google" />
            Sign up with Google
          </button>
          <p className='signup-bleh'>Already have an account?<span><Link to="/signin">Sign in</Link></span></p>
        </form>
      </div>
    </div>
  )
}
