const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = 'es-ES'; 
    return date.toLocaleDateString(locale); 
};

export default formatDate;
