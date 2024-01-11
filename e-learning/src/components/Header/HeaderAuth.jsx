import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPES } from "../../constants/role";
import HeaderLogged from "./HeaderLogged";
import tokenMethod from "../../utils/token";

export default function HeaderAuth() {
  const { handleShowModal } = useAuthContext();
  if (!!tokenMethod.get()) {
    return (
      <HeaderLogged/>
    )
  }

  return (
    <div className="header__auth">
      <div className="btn btn--transparent btnmodal">
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleShowModal(MODAL_TYPES.login);
          }}
        >
          Đăng nhập /&nbsp;
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleShowModal(MODAL_TYPES.register);
          }}
        >
          Đăng ký
        </span>
      </div>
    </div>
  );
}
