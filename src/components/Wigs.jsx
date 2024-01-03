import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa6'
import wigs from './wigsData.js'
import { useCart } from 'react-use-cart'

export default function Wigs({
  img,
  name,
  price,
  description,
  id,
  item,
  user,
}) {
  const { addItem } = useCart()


  return (
    <div className="wigs-contaier">
      <div key={id} className="wg">
        <div className="">
          <img src={img} alt="A wig" className="wig-img" />
        </div>
        <div className="wig-details-cont">
          <p className="wig-name">{name} </p>
          <p className="wig-price">N{price}</p>
        </div>
        <p className="wig-desc">{description}</p>
        <div className="buttons-cont">
          {user && (
            <button className="add-to-cart" onClick={() => addItem(item)}>
              ADD TO CART
            </button>
          )}
          {/* {user && (
            <FaHeart
              className="heart-icon"
              style={{
                color: isLiked ? 'red' : 'grey',
                fontSize: '2em',
                marginTop: '1rem',
              }}
              onClick={handleLiked}
            />
          )} */}
        </div>
      </div>
    </div>
  )
}
