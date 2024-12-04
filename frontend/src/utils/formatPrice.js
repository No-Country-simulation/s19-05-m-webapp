const formatPrice = (value) => {
    let cleanedValue = value.replace(/[^0-9]/g, '');
    
    if (cleanedValue) {
        let numericValue = (parseInt(cleanedValue, 10) || 0) * 0.01;
        return numericValue.toFixed(2); 
    }
    
    return ''; 
};
  
export default formatPrice;
