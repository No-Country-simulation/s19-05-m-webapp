import { useState, useEffect } from "react";
import Dropdown from "../dropdown/Dropdown";
import formatPrice from "../../utils/formatPrice";
import options from "../../utils/options";

import "./form.css";

const Form = ({ fields, onSubmit, initialValues, buttonText, 
    className = false, errors = false, showButton = true }) => {
    const [formValues, setFormValues] = useState(initialValues || {});
    const [modelOptions, setModelOptions] = useState([]); 

    useEffect(() => {
        if (formValues.name) {
            const newModelOptions = options.modelOptionsByPlatform[formValues.name] || [];
            setModelOptions(newModelOptions);
        } else {
            setModelOptions([]);
        }
    }, [formValues.name]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price') {
            const formattedValue = formatPrice(value);
            setFormValues({
                ...formValues,
                [name]: formattedValue,
            });
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
                        <label htmlFor={field.name}>
                            {!formValues.name && field.label === "Seleccionar Modelo" ? 
                            '' : field.label}
                        </label>
                        {
                            field.type === "select" ? (
                                field.name === "name" ? (
                                    <Dropdown
                                        name={field.name}
                                        value={formValues[field.name] || ""}
                                        onChange={handleChange}
                                        options={options.platformOptions} 
                                    />
                                ) : field.name === "model" && formValues.name ? (
                                    <Dropdown
                                        name={field.name}
                                        value={formValues[field.name] || ""}
                                        onChange={handleChange}
                                        options={modelOptions}  
                                    />
                                ) : field.name === "genre" ? (
                                    <Dropdown
                                        name={field.name}
                                        value={formValues[field.name] || ""}
                                        onChange={handleChange}
                                        options={field.options} 
                                    />
                                ) : null
                            ) : field.type === "textarea" ? (
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    value={formValues[field.name] || ""}
                                    onChange={handleChange}
                                    placeholder={field.placeholder || ""}
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
                            )
                        }
                        {
                            errors[field.name] && <p className="error-text">{errors[field.name]}</p>
                        }
                    </div>
                ))
            }
            {
                showButton && <button type="submit" className="form-btn">{buttonText}</button>
            }
        </form>
    );
};

export default Form;
