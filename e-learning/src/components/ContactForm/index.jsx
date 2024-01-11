import React, { useState } from "react";
import FieldInput from "../FieldInput";
import Button from "../Button";
import { regrexRule, requireRule, validate } from "../../utils/validate";
import TextArea from "../TextArea";
import Select from "../Select";
import useForm from "../../hooks/useFrom";

const rules = {
  name: [requireRule("Vui lòng nhập tên")],
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
  topic: [requireRule("Vui lòng nhập topic")],
  content: [requireRule()],
};

export default function ContactForm({ handleFormSubmit }) {
  //khai bao const sex bi bao loi
  const { form, error, register, validate } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      topic: "",
      content: "",
    },
    rules
  );

  const _onSubmit = () => {
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error: ", errorObject);
    } else {
      console.log("Submit success: ", form);
      handleFormSubmit?.(form);
    }
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>

      <FieldInput
        label="Ho va ten"
        placeholder="Ho va ten"
        required
        {...register("name")}
      />
      <FieldInput
        label="Email"
        placeholder="Nhap Email"
        required
        {...register("email")}
      />
      <FieldInput
        label="So dien thoai "
        placeholder="Nhap So dien thoai"
        required
        {...register("phone")}
      />

      <FieldInput
        label="Chủ đề cần hỗ trợ"
        required
        {...register("topic")}
        renderInput={(restProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJs" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...restProps}
            />
          );
        }}
      />

      <FieldInput
        label="Nội dung"
        required
        {...register("content")}
        renderInput={(restProps) => {
          return <TextArea {...restProps} />;
        }}
      />

      <div className="btncontrol">
        <Button variant="primary" onClick={_onSubmit} />
      </div>
    </div>
  );
}
