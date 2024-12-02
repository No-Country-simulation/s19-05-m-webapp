const validateForm = (formValues, schema) => {
    return schema
        .validate(formValues, { abortEarly: false })
        .then(() => {
            return { isValid: true, errors: {} }; 
        })
        .catch((validationErrors) => {
            const formattedErrors = {};
            validationErrors.inner.forEach((error) => {
                formattedErrors[error.path] = error.message;
            });
            return { isValid: false, errors: formattedErrors }; 
        });
};

export default validateForm;
