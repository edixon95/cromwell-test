import "../../assets/css/modal.css";

const Modal = (props) => {
    return (
        <div className="modalBackground">
            <div className="modal">
                <div className="modalX">
                    <span onClick={props.close}>X</span>
                </div>
                {props.children}
            </div>
        </div >
    )
};

export default Modal;