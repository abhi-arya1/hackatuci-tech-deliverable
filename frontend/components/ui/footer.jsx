
const Footer = () => {
    return ( 
        <footer style={{
            paddingTop: '20px', 
            display: 'flex', 
            flexDirection: 'column',
        }}>
            <span className="less-shadowed-text">Made with ❤️ for Hack At UCI</span>
            <span>- Abhigyan Arya, {new Date().getFullYear()}</span>
        </footer>
     );
}
 
export default Footer;