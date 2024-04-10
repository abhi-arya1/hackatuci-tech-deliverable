import "./styles/quote.css";
import { motion } from "framer-motion"

function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days < 30) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (months < 12) {
        return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
}

const QuoteBox = ({ name, message, time }) => {

    const variants = {
        initial: { y: 0 }, 
        hover: { y: -10 }, 
      };
        
    return (
            <motion.div
                initial="initial" 
                whileHover="hover"
                variants={variants} 
                transition={{ type: "keyframes", stiffness: 300 }} 
                className="quote less-shadowed-text"
            >
                <div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <span style={{
                            fontSize: "1rem",
                            paddingRight: '20px'
                        }}>{name}</span>
                        <span style={{
                            fontSize: "0.8rem",
                        }}>{timeAgo(time)}</span>
                    </div>
                    <div className="message-scroll">
                        <p>{message}</p>
                    </div>
                </div>
            </motion.div>
    )
}

export default QuoteBox;