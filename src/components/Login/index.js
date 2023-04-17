import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import ModeContext from '../../context/ModeContext'

import './index.css'

class Login extends Component {
  state = {
    isChecked: false,
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      isChecked,
      username,
      password,
      showSubmitError,
      errorMsg,
    } = this.state
    const passwordType = isChecked ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ModeContext.Consumer>
        {value => {
          const {isDark} = value
          const containerClassName = isDark
            ? 'dark-container container'
            : 'light-container container'
          const cardClassName = isDark ? 'dark-card card' : 'light-card card'
          const logoUrl = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <div className={containerClassName}>
              <div className={cardClassName}>
                <img src={logoUrl} alt="logo" className="logo" />
                <form className="form-container" onSubmit={this.submitForm}>
                  <label htmlFor="username">USERNAME</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    className="name-input"
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                  />
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    type={passwordType}
                    id="password"
                    value={password}
                    className="password-input"
                    placeholder="Password"
                    onChange={this.onChangePassword}
                  />
                  <div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      id="checkbox"
                      onChange={this.onClickCheckBox}
                    />
                    <label htmlFor="checkbox">Show Password</label>
                  </div>
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </ModeContext.Consumer>
    )
  }
}

export default Login
