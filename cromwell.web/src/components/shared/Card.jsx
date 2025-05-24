import "../../assets/css/card.css";

const Card = ({ children, height }) => {
    return (
        <div className="card" style={{ height: height ?? "90%" }}>
            {children}
        </div>
    )
};

export default Card;