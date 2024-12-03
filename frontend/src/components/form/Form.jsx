import { useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import "./form.css";

const Form = ({ fields, onSubmit, initialValues, buttonText, 
    className = false, errors = false, showButton = true }) => {
    const [formValues, setFormValues] = useState(initialValues || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'price') {
            let cleanedValue = value.replace(/[^0-9]/g, '');
    
            if (cleanedValue) {
                let numericValue = (parseInt(cleanedValue, 10) || 0) * 0.01;
                let formattedValue = numericValue.toFixed(2);
                
                setFormValues({
                    ...formValues,
                    [name]: formattedValue,
                });
            } else {
                setFormValues({
                    ...formValues,
                    [name]: '',
                });
            }
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            {
                fields.map((field) => (
                    <div key={field.name} className="form-group">
                        <label htmlFor={field.name}>{field.label}</label>
                        {
                            field.type === "select" ? (
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
                        {
                            errors[field.name] && <p className="error-text">{errors[field.name]}</p>
                        }
                    </div>
                ))
            }
            {
                showButton && <button type="submit" className={`form-btn`}>{buttonText}</button>
            }
        </form>
    );
};

export default Form;
