import "../../assets/css/button.css";

const Button = (props) => {

    const variantClasses = {
        confirm: "buttonConfirm",
        cancel: "buttonCancel",
        clear: "buttonClear",
        clearWhite: "buttonClearW"
    };

    const variantClass = variantClasses[props?.variant] || variantClasses["confirm"];

    return (
        <button onClick={props.onClick} className={`buttonBase ${variantClass}`}>
            {props.children}
        </button>
    )
};

export default Button;