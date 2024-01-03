import React, { useState } from 'react'
import AdminNav from './AdminNav'
import { FaCamera } from 'react-icons/fa'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'

export default function Settings() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const style = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  }
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="settings-main-cont">
      <AdminNav />
      <div className="settings-cont">
        <div className="profile-image-cont">
          <img src="./profile.jpg" alt="profile" className="profile-image" />
          <FaCamera className="camera-icon" />
        </div>
        <form className="settings-form">
          <label>Fullname</label>
          <input type="text" />

          <label>Email</label>
          <input type="text" />

          <label for="password">Change Password</label>
          <div className="password-div">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password--"
            />
            <div onClick={handleTogglePassword} className="eyes">
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </div>
          </div>

          <label>Confirm password</label>
          <input type="password" />
          <button className="settings-page-btn">Save changes</button>
        </form>
      </div>
    </div>
  )
}
