import React from 'react'

export default function CoursePaymentItem({name, paymentMethod, createAt, course}) {
  return (
    <div className="itemhistory">
          <div className="name">{name}</div>
    <div className="payment">{paymentMethod}</div>
    <div className="date">{createAt}</div>
    <div className="money">{course?.price} VND</div>
  </div>
  )
}
