

const Button = ({ children }) => {
    return ( 
        <button
        style={{
            fontFamily: 'inherit',
            borderRadius: '0.375rem',
            padding: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#171a67',
            boxShadow: '0 2px 10px #black-a7',
        }}>
            {children}
        </button>
     );
}
 
export default Button;