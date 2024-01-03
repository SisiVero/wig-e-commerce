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

export default function SignUpAdmin() {
  const [state, setState] = useState(userDetails)
  const { fullName, email, password, confirmPassword } = state
  const navigate = useNavigate()

  function handleInput(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  async function handleAuth(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert('Passwords Do not match!!')
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
        role: 'admin',
      }
      const userRoleDocRef = doc(collection(db, 'userRole'), user.uid)
      await setDoc(userRoleDocRef, userRole)
      toast.success('Account created successfully!')
      navigate('/')
    } else {
      return toast.warning('All feilds are required!')
    }
  }

  return (
    <div className="signup-cont-admin">
      <div className="signup-form-cont-admin">
        <form onSubmit={handleAuth} className="signup-form">
          <p className="form-header">Create an account</p>
          <input
            type="name"
            name="fullName"
            value={fullName}
            onChange={handleInput}
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
            placeholder="Password"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInput}
            placeholder="Confirm Password"
            required
          />
          <button className="signup-btn">Sign up</button>
          <p className="signup-bleh">
            Already have an account?
            <span>
              <Link to="/signin">Sign in</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
