import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-container">
      <button className="footer-icon-btn" type="button">
        <FaGoogle className="footer-icon" />
      </button>
      <button className="footer-icon-btn" type="button">
        <FaTwitter className="footer-icon" />
      </button>
      <button className="footer-icon-btn" type="button">
        <FaInstagram className="footer-icon" />
      </button>
      <button className="footer-icon-btn" type="button">
        <FaYoutube className="footer-icon" />
      </button>
    </div>
    <p className="footer-para">Contact us</p>
  </div>
)

export default Footer
