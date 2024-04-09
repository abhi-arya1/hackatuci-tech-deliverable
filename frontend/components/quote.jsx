import "./styles/quote.css";
import { motion } from "framer-motion"
import { useState } from "react";

const QuoteBox = ({ name, message }) => {
    const [style, setStyle] = useState({});

    const updateStyle = () => {
        setStyle({
            backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        })
    }

    const removeStyle = () => {
        setStyle({});
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="quote transition-all"
            style={style}
            onHoverStart={updateStyle}
            onHoverEnd={removeStyle}
        >
            {name}: {message}
        </motion.div>
    )
}

export default QuoteBox;