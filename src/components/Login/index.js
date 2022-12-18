import './index.css'

import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginSuccess: true,
    errormsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errormsg => {
    this.setState({loginSuccess: false, errormsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(details),
    }

    const response = await fetch(apiUrl, option)

    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const jwtToken = data.jwt_token
      //   console.log(jwtToken)
      this.onSuccessLogin(jwtToken)
    } else {
      //   console.log(data.error_msg)
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errormsg, loginSuccess} = this.state
    // console.log(username, password)
    const Token = Cookies.get('jwt_token')
    // console.log(Token)
    if (Token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <img
          src="https://res.cloudinary.com/dququtrt4/image/upload/v1671342038/moviesApp/Group_7399_u2glbo.png"
          alt="login website logo"
          className="movie-logo"
        />
        <div className="logo-form-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="user-name" className="username-label">
                USERNAME
              </label>
              <input
                id="user-name"
                type="text"
                className="user-name"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="username-label">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="user-name"
                placeholder="Password"
                value={password}
                onChange={this.onChangeUserPassword}
              />
            </div>
            {loginSuccess ? null : <p className="error-msg">*{errormsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
