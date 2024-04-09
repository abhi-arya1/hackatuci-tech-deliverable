import "./styles/quote.css";

const QuoteBox = ({ name, message }) => {
    return (
        <div className="test">
            {name}: {message}
        </div>
    )
}

export default QuoteBox;