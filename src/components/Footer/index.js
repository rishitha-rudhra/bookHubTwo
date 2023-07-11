import './index.css'
import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <div className="icons-container">
      <FaGoogle />
      <FaTwitter />
      <FaInstagram />
      <FaYoutube />
    </div>
    <p>Contact Us</p>
  </div>
)

export default Footer
