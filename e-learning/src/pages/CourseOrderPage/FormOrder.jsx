import React from 'react'
import FieldInput from '../../components/FieldInput';
import Select from '../../components/Select';

const FormOrder = ({ register, types, disabled }) => {
  const typeOptions =
    types?.length > 0
      ? [
          { value: "", label: "--" },
          ...types.map((type) => ({ value: type, label: type })),
        ]
      : [{ value: "", label: "--" }];
  
  return (
    <div className="itemorder formorder">
      <h3 className="title --t3">Thông tin cá nhân</h3>
      <div className="boxorder">
        <div className="form">
          <div className="form-container">
            <FieldInput
               disabled={disabled}
              label="Họ và tên"
              required
              placeholder="Họ và tên"
              {...register("name")}
            />
            <FieldInput
              
              label="Email"
              required
              placeholder="Email"
              disabled={disabled}
              {...register("email")}
            />
          </div>
          <div className="form-container">
            <FieldInput
               disabled={disabled}
              label="Số điện thoại"
              required
              placeholder="Số điện thoại"
              {...register("phone")}
            />
            <FieldInput
               disabled={disabled}
              label="Hình thức học"
              required
              renderInput={(inputProps) => {
                return <Select options={typeOptions} {...inputProps} />;
              }}
              {...register("type")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormOrder;
