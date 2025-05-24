import "../../assets/css/label.css";

const Label = ({ children, htmlFor }) => {
    return (
        <label htmlFor={htmlFor} className="inputLabel">
            {children}
        </label>
    )
};

export default Label;