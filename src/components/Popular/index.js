import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Footer from '../Footer'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Popular extends Component {
  state = {
    popularList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const token = Cookies.get('jwt_token')
    // console.log(token)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        popularList: updateData,
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

  popularViewSucces = () => {
    const {popularList} = this.state
    return (
      <ul className="popular-movies-container">
        {popularList.map(eachItem => (
          <Link
            to={`movies/${eachItem.id}`}
            className="popular-image-link"
            key={eachItem.id}
          >
            <li className="list-item">
              <img
                src={eachItem.posterPath}
                alt={eachItem.title}
                className="popular-img-item"
              />
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  popularViewFailure = () => (
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
        onClick={this.getPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  popularView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.lodingView()
      case apiStatusConstants.success:
        return this.popularViewSucces()
      case apiStatusConstants.failure:
        return this.popularViewFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="popular-main-bg">
          <Header />
          {this.popularView()}
          <Footer />
        </div>
      </>
    )
  }
}

export default Popular
