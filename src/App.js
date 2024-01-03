import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Footer from './components/Footer'
import Cart from './components/Cart'
import SignUp from './components/SignUpUser'
import SignUpAdmin from './components/SignUpAdmin'
import SignIn from './components/SignIn'
import AddProduct from './components/AddProduct'
import AdminDashboard from './components/AdminDashboard'
import Orders from './components/OrdersPage'
import Products from './components/Products'
import Settings from './components/Settings'
import { auth, db } from './components/firebase'
import { getDoc, doc, collection } from 'firebase/firestore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App({ items }) {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const fetcUserRole = async () => {
      try {
        if (user) {
          const userDocRef = doc(collection(db, 'userRole'), user.uid)
          const userSnapshot = await getDoc(userDocRef)

          if (userSnapshot.exists()) {
            const userRoleData = userSnapshot.data()

            setUserRole(userRoleData.role)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetcUserRole()
  }, [user])
  console.log(userRole)

  useEffect(() => {
    function checkUser() {
      return auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user)
        } else {
          setUser(null)
        }
      })
    }

    checkUser()
  }, [])

  return (
    <div className="app">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          {/* <Route
            path="wishlist"
            element={<WishList user={user} setUser={setUser} items={items} />}
          /> */}
          <Route
            path="cart"
            element={<Cart user={user} setUser={setUser} items={items} />}
          />
          <Route path="signup" element={<SignUp />} />
          <Route path="signup-admin" element={<SignUpAdmin user={user} />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="products" element={<Products />} />

          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Routes>

        {/* <Footer /> */}
      </Router>
    </div>
  )
}

export default App
