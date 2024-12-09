const paymentStatus = (status) => {
    const statusTranslations = {
        PAID: 'PAGADO',
        PENDING: 'PENDIENTE',
        DECLINED: 'RECHAZADO',
        CANCELLED: 'CANCELADO'
    };

    return statusTranslations[status] || status; 
};

const userRole = (role) => {
    const roleTranslations = {
        USER: 'CLIENTE',
        ADMINISTRATOR: 'ADMINISTRADOR',
    };

    return roleTranslations[role] || role; 
};

const translate = {
    paymentStatus,
    userRole,
}

export default translate;
