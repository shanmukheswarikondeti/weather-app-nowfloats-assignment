import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not-found"
      className="not-found-img"
    />
    <p className="page-not-found-msg">
      Page Not Found ~ <Link to="/">Take me to home</Link>
    </p>
  </div>
)

export default NotFound
