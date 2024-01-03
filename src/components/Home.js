import React, { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import Wigs from './Wigs'
import NavBar from './NavBar'
import Hero from './Hero'
import { useCart } from 'react-use-cart'
import { toast } from 'react-toastify'

export default function Home({ user, setUser }) {
  const { items } = useCart()
  const [wigsData, setWigsData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'))
        const data = querySnapshot.docs.map((doc) => {
          const id = doc.id
          const wigData = doc.data()
          return { ...wigData, id }
        })
        setWigsData(data)
      } catch (error) {
        toast.error('Error fetching data from Firebase')
      }
    }

    fetchData()
  }, []) // Run the effect once when the component mounts

  return (
    <>
      <NavBar user={user} setUser={setUser} items={items} />
      <Hero />
      <div className="wigs-container">
        {wigsData.map((wig, id) => (
          <div className="wig" key={id}>
            <Wigs
              img={wig.image}
              name={wig.name}
              description={wig.description}
              price={wig.price}
              key={id}
              item={wig}
              user={user}
            />
          </div>
        ))}
      </div>
    </>
  )
}
