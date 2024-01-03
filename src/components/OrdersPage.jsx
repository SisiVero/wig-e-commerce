import React from 'react'
import AdminNav from './AdminNav'
import ordersList from './ordersList'

export default function Orders() {
  return (
    <div className="o-page-main-cont">
      <AdminNav />
      <div className="o-page-cont">
        <table className='o-page-table'>
          <thead className='o-page-thead'>
            <tr className='o-page-th-tr'>
              <th >ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody className='o-page-tbody'>
            {ordersList.map((orders,id) => (
              <tr key={orders.id}>
                <td>{orders.id}</td>
                <td className='o-page-image-name'><img src={orders.image} alt={orders.customer} className='o-page-image'/><p>{orders.customer}</p></td>
                <td>{orders.status}</td>
                <td>${orders.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
