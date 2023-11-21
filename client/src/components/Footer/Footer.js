import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">
      <div className="text_footer row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 container">
          <ul className="social">
            <li> <Link to="/"><i className="fab fa-facebook-f" /></Link>
            </li>
            <li> <Link to="/"><i className="fab fa-google-plus-g" /></Link>
            </li>
            <li> <Link to="/"><i className="fab fa-twitter" /></Link>
            </li>
            <li> <Link to="/"><i className="fab fa-pinterest-p" /></Link>
            </li>
            <li> <Link to="/"><i className="fab fa-instagram" /></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer;

