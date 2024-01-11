import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPES } from "../../constants/role";
import useForm from "../../hooks/useFrom";
import { requireRule, regrexRule } from "../../utils/validate";
import FieldInput from "../FieldInput";
import  Button  from "../../components/Button/index";
import ComponentLoading from "../ComponentLoading";

const LoginForm = () => {
  const { handleShowModal, handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      password: [requireRule("Vui lòng nhập password")],
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
      handleLogin?.(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
      // setTimeout(() => {
      //   setLoading(false);
      //   message.success("Đăng nhập thành công");
      // }, 1000);
    }
  };
  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPES.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <FieldInput
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <FieldInput
          label="Password"
          placeholder="Password"
          required
          type="password"
          {...register("password")}
        />
        <Button className="form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;