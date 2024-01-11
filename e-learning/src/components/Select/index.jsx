import React from "react";

export default function Select({ options, error, ...rest }) {
  return (
    <select {...rest} className={`form__input ${error ? "formerror" : ""}`}>
      {options?.map((option, index) => (
        <option key={option?.value || index} value={option?.value}>
          {option?.label || ""}
        </option>
      ))}
    </select>
  );
}
