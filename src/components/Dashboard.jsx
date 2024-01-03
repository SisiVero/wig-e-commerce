import React, { useState } from 'react'
import info from './salesInfo'
import Example from './PieChart'
import LineChart from './LineChart'
import { FaSearch } from 'react-icons/fa'
import { FiSun, FiMoon } from 'react-icons/fi'
import { BsBell } from 'react-icons/bs'
import topSellingProducts from './topSellingProducts'
import recentOrders from './recentOrders'

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false)

  function handleDarkMode() {
    setIsDark(!isDark)
  }

  return (
    <div className="dashboard-cont">
      <div className="admin-top-nav">
        <h3 className="dashboard-text">Dashboard</h3>
        <div className="other-nav-items">
          <button onClick={handleDarkMode} className="theme-btn">
            {isDark ? (
              <FiSun className="light-theme" />
            ) : (
              <FiMoon className="dark-theme" />
            )}
          </button>
          <div className="input-cont">
            <FaSearch className="search-icon" />
            <input
              type="search"
              name="search"
              placeholder="Search here"
              className="search-input"
            />
          </div>

          <button className="notif-cont">
            <BsBell size={24} color="black" className="notif-icon" />
          </button>
          <img src="wig9.jpg" alt="profile picture" className="profile-pic" />
        </div>
      </div>
      <div className="divide">
        <div className="second-nav">
          <div className="info-main-cont">
            {info.map((item, id) => {
              const backgroundColorClass = `info-cont-${id + 1}`
              return (
                <div key={id} className={`info-cont ${backgroundColorClass}`}>
                  <p className="item-title">{item.title}</p>
                  <p className="item-price">${item.amount}</p>
                </div>
              )
            })}
          </div>

          <div className="analytic-cont">
            <p className="analytic-text">Earning Analytics</p>
            <LineChart />
          </div>
          <div className="top-selling-product-cont">
            <p className="t-text">Top Selling Products</p>

            <div>
              <table className="tp-table">
                <thead>
                  <tr>
                    <th >Products</th>
                    <th>Price</th>
                    <th>Orders</th>
                    <th>Stock</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="tp-tbody">
                  {topSellingProducts.map((product) => (
                    <tr key={product.id} className="product-cont">
                      <td className="image-product-name">
                        <img
                          src={product.product.image}
                          alt={product.product.name}
                          className="product-image"
                        />
                        {product.product.name}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.orders}</td>
                      <td>{product.quantity}</td>
                      <td>${product.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="third-nav">
          <div className="piechart-cont">
            <p className="piechart-text">Mode of Order</p>
            <Example className="piechart" />
          </div>
          <div className="last-side-cont">
            <p className="last-slide-text">Recent Orders</p>
            <table className='orders-table'>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className='orders-image-product-name'>
                      <img src={order.image} alt={order.productName} className='orders-image'/>
                      {order.productName}
                    </td>

                    <td>${order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
