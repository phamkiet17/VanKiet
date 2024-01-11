import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { formatCurrency, formatDate } from "../../utils/format";
import { PAYMENT_METHOD } from "../../constants/role";

export default function MyPayment() {
  const { paymentInfo } = useAuthContext();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {!!!paymentInfo.length && <p>Không có dữ liệu.</p>}
      {!!paymentInfo.length &&
        paymentInfo.map((item, index) => {
          const { id, name, paymentMethod, createdAt, course } = item;
          const paymentMetyhodName = PAYMENT_METHOD[paymentMethod];
          return (
            <div
              key={id || new Date().getTime() + index}
              className="itemhistory"
            >
              <div className="name">{name}</div>
              <div className="payment">{paymentMetyhodName}</div>
              <div className="date">{formatDate(createdAt)}</div>
              <div className="money">{formatCurrency(course?.price)} VND</div>
            </div>
          );
        })}
    </div>
  );
}
