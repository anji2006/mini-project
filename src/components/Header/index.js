import './index.css'

import {Link} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdOutlineCancel} from 'react-icons/md'

class Header extends Component {
  state = {
    hamburgMenu: false,
    searchEle: false,
    searchInput: '',
  }

  showNavLinks = () => {
    this.setState({hamburgMenu: true, searchEle: false})
  }

  cancelHamburgMenu = () => {
    this.setState({hamburgMenu: false})
  }

  renderSearchRoute = () => {
    this.setState({searchEle: true, hamburgMenu: false})
  }

  searchResults = () => {
    const {getSearchMoviesList} = this.props
    const {searchInput} = this.state
    getSearchMoviesList(searchInput)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {hamburgMenu, searchEle, searchInput} = this.state
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
            <ul className="nav-links-container nav-links-container-list">
              <Link to="/" className="link">
                <li className="nav-item">Home</li>
              </Link>
              <Link to="/popular" className="link">
                <li className="nav-item">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="search-and-profile">
            {searchEle === false ? (
              <button
                type="button"
                className="search-btn"
                onClick={this.renderSearchRoute}
              >
                <Link to="/search" className="link">
                  <HiOutlineSearch className="search-icon" />
                </Link>
              </button>
            ) : (
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.searchResults}
                >
                  <HiOutlineSearch className="search-icon" />
                </button>
              </div>
            )}

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
              <img
                src="https://res.cloudinary.com/dququtrt4/image/upload/v1671615722/moviesApp/add-to-queue_1_dumnjf.png"
                alt="menu"
                className="search-icon"
              />
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
              onClick={this.cancelHamburgMenu}
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
