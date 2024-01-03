import React from 'react'
import { useCart } from 'react-use-cart'
import NavBar from './NavBar'
import './Cart.css'

export default function Cart({ user, setUser }) {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart()
  if (isEmpty) {
    return (
      <>
        <NavBar user={user} setUser={setUser} items={items} />
        <p className='add-items-text'>Add items to your cart</p>
      </>
    )
  }
  return (
    <>
      <NavBar user={user} setUser={setUser} items={items} />
      <div className="cart-div">
        <div className="cart-total">
          <p className="cart-header">
            Cart: <strong>{totalUniqueItems} </strong>
          </p>
          <p className="total-wigs">
            Total Wigs:
            <strong>{totalItems}</strong>
          </p>
        </div>
        {items.map((item, id) => {
          return (
            <div key={id} className="cart-wig">
              <div>
                <img src={item.imageUrl} alt={item.wigName}className="cart-wig-img" />
              </div>
              <div className="cart-div-second">
                <div className="wig-name-div">
                  <p className="cart-wig-name">{item.wigName} </p>
                  <p className="cart-price">${item.price}</p>
                  <p className="cart-desc">{item.description}</p>
                </div>
                <div className="cart-buttons">
                  <p>Quantity: </p>
                  <button
                    className="remove-btn"
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <strong className="item-qnty">{item.quantity}</strong>
                  <button
                    className="add-btn"
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="add-buy">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                  <button className="buy-btn">Buy</button>
                </div>
              </div>
            </div>
          )
        })}
        <div className="cart-bottom-div">
          <p className="total-price">
            Total Price: <strong> ${cartTotal}</strong>
          </p>
          <button onClick={() => emptyCart()} className="remove-all-btn">
            Remove all
          </button>
        </div>
      </div>
    </>
  )
}
