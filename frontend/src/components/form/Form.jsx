import { useState } from "react";
import "./form.css"

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
                <select
                id={field.name}
                name={field.name}
                value={formValues[field.name] || ""}
                onChange={handleChange}
                >
                {field.options.map((option, index) => (
                    <option
                    key={index}
                    value={option.value}
                    disabled={option.disabled || false}
                    >
                    {option.label}
                    </option>
                ))}
                </select>
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
