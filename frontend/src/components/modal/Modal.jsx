import './modal.css';

const Modal = ({ isOpen, onClose, title, children, width = "400px", 
    height = "98vh", className="" }) => {
    if (!isOpen) return null;  

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className={`modal-content ${className}`} style={{ width, height }} > 
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close-btn" onClick={onClose}>X</button>
                </div>
                <hr className="modal-divider" />
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
