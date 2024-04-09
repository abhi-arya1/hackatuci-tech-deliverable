import "./styles/quote.css";
import { motion } from "framer-motion"
import { useState } from "react";

const QuoteBox = ({ name, message, time }) => {
    const [style, setStyle] = useState({});

    const updateStyle = () => {
        setStyle({
            backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        })
    }

    const removeStyle = () => {
        setStyle({});
    }

    const _time = new Date(time).toLocaleString();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="quote transition-all"
            style={style}
            onHoverStart={updateStyle}
            onHoverEnd={removeStyle}
        >
            {name}: {message} -- {_time}
        </motion.div>
    )
}

export default QuoteBox;