import React from 'react'
import AdminNav from './AdminNav'
import Dashboard from './Dashboard'
import './AdminDashboard.css'

export default function AdminDashboard() {
  return (
    <>
    <div className="admin-main-cont">
      <AdminNav />
      <Dashboard />
      </div>
      <div className="mobile-text">
      <p >
        Dashboard can only display on larger screens
      </p>
    </div>
    </>
  )
}
