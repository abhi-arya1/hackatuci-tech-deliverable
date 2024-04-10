import "./styles_ui/button.css";

const Button = ({ children }) => {
    return ( 
        <button className="customButton">
            {children}
        </button>
     );
}
 
export default Button;