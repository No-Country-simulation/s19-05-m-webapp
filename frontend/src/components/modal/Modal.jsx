import './modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;  

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>X</button>
                {children} 
            </div>
        </div>
    );
};

export default Modal;
