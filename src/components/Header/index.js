import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwtToken')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header">
      <div className="logo-container header-logo-section">
        <img
          src="https://res.cloudinary.com/dq35rpgor/image/upload/v1689070685/samples/Group_7730_n4k5ti.svg"
          alt="website logo"
          className="website-logo"
        />
        <p className="logo-text">ook Hob</p>
      </div>
      <ul className="navigation-list">
        <li className="navigation-item">Home</li>
        <li className="navigation-item">Bookshelves</li>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
