import React from "react";

export default function FieldInput({
  error,
  label,
  required,
  type = "text",
  placeholder,
  renderInput, // ki thuat render props
  ...props
}) {
  return (
    <div className="form-group">
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput ? (
        renderInput?.(props)
      ) : (
        <input
            {...props}
          
          // da truyen vao props
          // value={form.name || ""}
          // onChange={(e) => {
          //   setForm({ ...form, name: e.target.value });
          // }}
          type={type}
          placeholder={placeholder}
          className={`form__input ${error ? 'formerror' : ''}`}
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
