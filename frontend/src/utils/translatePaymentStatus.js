const translatePaymentStatus = (status) => {
    const statusTranslations = {
        PAID: 'PAGADO',
        PENDING: 'PENDIENTE',
        DECLINED: 'RECHAZADO',
        CANCELLED: 'CANCELADO'
    };

    return statusTranslations[status] || status; 
};

export default translatePaymentStatus;
