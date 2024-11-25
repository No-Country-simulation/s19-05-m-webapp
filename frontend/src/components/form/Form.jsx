import { useState } from "react";
import "./form.css";
import Dropdown from "../dropdown/Dropdown";

const Form = ({ fields, onSubmit, initialValues, buttonText }) => {
  const [formValues, setFormValues] = useState(initialValues || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "select" ? (
            <Dropdown
              name={field.name}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              options={field.options}
            />
          ) : (
            <input
              type={field.type || "text"}
              id={field.name}
              name={field.name}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder || ""}
            />
          )}
        </div>
      ))}
      <button className="form-btn">{buttonText}</button>
    </form>
  );
};

export default Form;
