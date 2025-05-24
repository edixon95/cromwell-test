import "../../assets/css/input.css";

const Input = (props) => {
    return (
        <input
            className="input"
            name={props.name}
            value={props.value ?? ""}
            onChange={props.onChange}
            type={props.type ?? "text"}
        />
    )
};

export default Input;