import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Footer from '../Footer'
import Header from '../Header'

const searchRouteActive = true
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

let searchInput

class Search extends Component {
  state = {
    searchMoviesList: [],
  }

  getSearchMoviesList = async search => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    searchInput = search

    const token = Cookies.get('jwt_token')
    // console.log(token)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${search}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const updateData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      //   console.log(updateData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchMoviesList: updateData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  lodingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  searchViewSucces = () => {
    const {searchMoviesList} = this.state
    if (searchMoviesList.length === 0) {
      return (
        <div className="no-search-results-bg">
          <img
            src="https://res.cloudinary.com/dququtrt4/image/upload/v1671710952/moviesApp/movies_not_found_d6o3ux.png"
            alt="no movies"
            className="no-movies-img"
          />
          <p className="no-movies-para">{`Your search for ${searchInput} did not find any matches.`}</p>
        </div>
      )
    }
    return (
      <>
        {searchMoviesList.map(each => (
          <li key={each.id} className="movie-search-item">
            <Link to={`/movies/${each.id}`}>
              <img
                src={each.posterPath}
                alt={each.title}
                className="search-movie-img"
              />
            </Link>
          </li>
        ))}
      </>
    )
  }

  getSearchMoviesListTry = () => {
    this.getSearchMoviesList(searchInput)
  }

  searchViewFailure = () => (
    <div className="popular-failure-bg">
      <img
        src="https://res.cloudinary.com/dququtrt4/image/upload/v1671434459/moviesApp/Background-Complete_zy2tyw.png"
        alt="failure view"
        className="popular-failure-img"
      />
      <p className="popular-failure-para">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="popular-failure-btn"
        onClick={this.getSearchMoviesListTry}
      >
        Try Again
      </button>
    </div>
  )

  searchMoviesListView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.lodingView()
      case apiStatusConstants.success:
        return this.searchViewSucces()
      case apiStatusConstants.failure:
        return this.searchViewFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="search-bg">
          <Header
            getSearchMoviesList={this.getSearchMoviesList}
            searchRouteActive={searchRouteActive}
          />

          <ul className="search-list-container">
            {this.searchMoviesListView()}
          </ul>
        </div>
        <Footer />
      </>
    )
  }
}

export default Search
