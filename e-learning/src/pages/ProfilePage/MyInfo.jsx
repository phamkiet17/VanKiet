import React, { useEffect } from "react";
import FieldInput from "../../components/FieldInput";
import Button  from "../../components/Button/index";
import useForm  from "../../hooks/useFrom";
import { regrexRule, requireRule } from "../../utils/validate";
import { useAuthContext } from "../../context/AuthContext";
import TextArea from "../../components/TextArea/index";
const rules = {
  firstName: [requireRule("Vui lòng nhập tên")],
  email: [
    requireRule("Vui lòng nhập email"),
    regrexRule("email", "Vui lòng nhập đúng định dạng email"),
  ],
  phone: [
    requireRule("Vui lòng nhập phone"),
    regrexRule(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Vui lòng nhập đúng định dạng phone"
    ),
  ],
  password: [requireRule("Vui lòng nhập mật khẩu")],
};

const MyInfo = () => {
  const { profile, handleUpdateProfile } = useAuthContext();
  const { form, setForm, register, validate } = useForm(
    {
      firstName: "",
      email: "",
      phone: "",
      password: "********",
      facebookURL: "",
      website: "",
      introduce: "",
    },
    rules
  );

  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error: ", errorObject);
    } else {
      handleUpdateProfile?.(form);
    }
  };

  useEffect(() => {
    if (profile) {
      setForm({ ...form, ...profile });
    }
  }, [profile]);

  console.log('form', form)
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form">
        <div className="form-container">
          <FieldInput
            label="Họ và tên"
            required
            placeholder="Họ và tên"
            {...register("firstName")}
          />
          <FieldInput
            label="Số điện thoại "
            required
            placeholder="Số điện thoại"
            {...register("phone")}
          />
        </div>
        <div className="form-container">
          <FieldInput
            label="Email"
            required
            placeholder="Email"
            {...register("email")}
            disabled
          />
          <FieldInput
            label="Mật khẩu"
            required
            placeholder="Mật khẩu"
            {...register("password")}
            disabled
          />
        </div>
        <FieldInput
          label="Facebook URL"
          required
          placeholder="Facebook URL"
          {...register("facebookURL")}
        />
        <FieldInput
          label="Website"
          required
          placeholder="Website"
          {...register("website")}
        />
        <FieldInput
          label="Giới thiệu bản thân"
          required
          renderInput={(inputProps) => {
            return <TextArea {...inputProps} />;
          }}
          {...register("introduce")}
        />
        <Button style={{ width: "100%" }} variant="primary" onClick={_onSubmit}>
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default MyInfo;