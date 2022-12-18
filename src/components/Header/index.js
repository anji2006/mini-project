import './index.css'

import {Link} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch, HiOutlineMenuAlt1} from 'react-icons/hi'
import {MdOutlineCancel} from 'react-icons/md'

class Header extends Component {
  state = {
    hamburgMenu: false,
  }

  showNavLinks = () => {
    this.setState({hamburgMenu: true})
  }

  cancelHamburbMenu = () => {
    this.setState({hamburgMenu: false})
  }

  render() {
    const {hamburgMenu} = this.state
    return (
      <>
        <nav className="nav-container">
          <div className="logo-container">
            <Link to="/" className="link">
              <img
                src="https://res.cloudinary.com/dququtrt4/image/upload/v1671342038/moviesApp/Group_7399_u2glbo.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <div className="nav-links-container">
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/popular" className="link">
                Popular
              </Link>
            </div>
          </div>
          <div className="search-and-profile">
            <button type="button" className="search-btn">
              <HiOutlineSearch className="search-icon" />
            </button>
            <Link to="/account" className="link">
              <img
                src="https://res.cloudinary.com/dququtrt4/image/upload/v1671342991/moviesApp/Avatar_qhwxzr.png"
                alt="profile"
                className="profile-img"
              />
            </Link>
            <button
              type="button"
              className="search-btn menu-btn"
              onClick={this.showNavLinks}
            >
              <HiOutlineMenuAlt1 className="search-icon" />
            </button>
          </div>
        </nav>
        {hamburgMenu && (
          <nav className="small-nav-links">
            <Link to="/" className="small-link">
              Home
            </Link>
            <Link to="/popular" className="small-link">
              Popular
            </Link>
            <Link to="/account" className="small-link">
              Account
            </Link>
            <button
              type="button"
              className="cancel-btn"
              onClick={this.cancelHamburbMenu}
            >
              <MdOutlineCancel className="cancel-icon" />
            </button>
          </nav>
        )}
      </>
    )
  }
}

export default Header
