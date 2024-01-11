import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useFrom";
import ComponentLoading from "../ComponentLoading";
import FieldInput from "../FieldInput";
import { Link } from "react-router-dom";
import Button from "../../components/Button/index";
import PATH from "../../constants/paths";
import { message } from "antd";
import { regrexRule, requireRule } from "../../utils/validate";
import { MODAL_TYPES } from "../../constants/role";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal, handleRegister } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    {
      name: [requireRule("Vui lòng nhập họ và tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      password: [requireRule("Vui lòng nhập mật khẩu")],
      confirmPassword: [
        requireRule("Vui lòng xác nhận mật khẩu"),
        (value, values) => {
          if (values.password && value !== values.password) {
            return "Mật khẩu xác nhận không đúng";
          }
          return false;
        },
      ],
    }
  );
  const _onSubmit = (e) => {
    e.preventDefault();
    const errObj = validate();
    if (Object.keys(errObj)?.length > 0) {
      console.log("Submit error", errObj);
    } else {
      setLoading(true);
      console.log("Submit success", form);
      handleRegister?.({ ...form }, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };
  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModal(MODAL_TYPES.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <FieldInput
          label="Họ và tên"
          placeholder="Họ và tên"
          required
          {...register("name")}
        />
        <FieldInput
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <FieldInput
          label="Mật khẩu"
          placeholder="Mật khẩu"
          required
          {...register("password")}
        />
        <FieldInput
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
          required
          {...register("confirmPassword")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý{" "}
          <Link
            className="color--primary"
            to={PATH.PRIVACY}
            onClick={handleCloseModal}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className="form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
