import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {activeTab} = props
  const onClickLogout = () => {
    Cookies.remove('jwtToken')
    const {history} = props
    history.replace('/login')
  }

  const activeTabClassForHome = activeTab === 'home' ? 'active-tab' : ''
  const activeTabClassForShelves = activeTab === 'shelf' ? 'active-tab' : ''

  return (
    <div className="header">
      <Link to="/" className="link-ele">
        <div className="logo-container header-logo-section">
          <img
            src="https://res.cloudinary.com/dq35rpgor/image/upload/v1689070685/samples/Group_7730_n4k5ti.svg"
            alt="website logo"
            className="website-logo"
          />
          <p className="logo-text">ook Hob</p>
        </div>
      </Link>
      <ul className="navigation-list">
        <Link className="link-element" to="/">
          <li className={`navigation-item ${activeTabClassForHome}`}>Home</li>
        </Link>
        <Link className="link-element" to="/shelf">
          <li className={`navigation-item ${activeTabClassForShelves}`}>
            Bookshelves
          </li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
