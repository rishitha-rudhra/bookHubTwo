import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  verifyUserDetails = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.status === 200) {
      Cookies.set('jwtToken', data.jwt_token, {expires: 3})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  onSubmitCredentials = event => {
    event.preventDefault()
    this.verifyUserDetails()
  }

  renderLoginForm = () => {
    const {errorMsg, username, password} = this.state

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dq35rpgor/image/upload/v1689070685/samples/Group_7730_n4k5ti.svg"
              alt="website logo"
              className="website-logo"
            />
            <p className="logo-text">ook Hob</p>
          </div>
          <form className="login-form" onSubmit={this.onSubmitCredentials}>
            <label htmlFor="username" className="label-ele">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input-ele"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password" className="label-ele">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-ele"
              onChange={this.onChangePassword}
              value={password}
            />
            <p className="error-msg">{errorMsg}</p>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  renderLgView = () => (
    <div className="bg-container">
      <img
        src="https://res.cloudinary.com/dq35rpgor/image/upload/v1689070685/samples/Rectangle_1467_lmzxw3.png"
        alt="login"
        className="lg-login-img"
      />
      {this.renderLoginForm()}
    </div>
  )

  render() {
    return (
      <>
        <div className="sm-bg-container">
          <img src="https://res.cloudinary.com/dq35rpgor/image/upload/v1689070552/samples/Ellipse_99_1_nxb9ti.png" />
          {this.renderLoginForm()}
        </div>
        {this.renderLgView()}
      </>
    )
  }
}

export default Login
