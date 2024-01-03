import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminNav() {
  return (
    <div className="nav-cont">
      <nav className="admin-nav">
        <h4 className="wig--">WIG DEALERS</h4>
        <ul className="admin-nav-list">
          <li className="admin-nav-item">
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li className="admin-nav-item">
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className="admin-nav-item">
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li className="admin-nav-item">
            <NavLink to="/settings">Settings</NavLink>
          </li>
          <li className="admin-log-out admin-nav-item"> Log out </li>
          </ul>

      </nav>
    </div>
  )
}
