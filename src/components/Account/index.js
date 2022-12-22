import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

class Account extends Component {
  logoutFromTheAccount = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <>
        <div className="account-main-bg">
          <Header />
          <div className="account-inner-container">
            <h1 className="account-heading">Account</h1>
            <div className="details-container">
              <p className="membership-para">Member ship</p>
              <div className="membership-details-container">
                <p className="text">anjiveeranki777@gmail.com</p>
                <p className="text">Password</p>
              </div>
            </div>
            <div className="details-container">
              <p className="membership-para">Plan details</p>
              <p className="premium-text">Premium</p>
              <p className="ultra-text">Ultra HD</p>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={this.logoutFromTheAccount}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Account
