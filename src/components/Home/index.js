import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import ReactSlick from '../ReactSlick'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Home extends Component {
  state = {
    trendingMovies: [],
    originalMovies: [],
    apiTrendingStatus: apiStatusConstants.initial,
    apiOriginalStatus: apiStatusConstants.initial,
    apiPosterStatus: apiStatusConstants.initial,
    posterDetails: {},
  }

  componentDidMount() {
    this.getOriginalMovies()
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({
      apiTrendingStatus: apiStatusConstants.inProgress,
    })

    const token = Cookies.get('jwt_token')
    // console.log(token)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const updateData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        overview: each.overview,
        title: each.title,
      }))

      //   console.log(updateData)
      this.setState({
        apiTrendingStatus: apiStatusConstants.success,

        trendingMovies: updateData,
      })
    } else {
      this.setState({
        apiTrendingStatus: apiStatusConstants.failure,
      })
    }
  }

  getOriginalMovies = async () => {
    this.setState({
      apiOriginalStatus: apiStatusConstants.inProgress,
      apiPosterStatus: apiStatusConstants.inProgress,
    })

    const token = Cookies.get('jwt_token')
    // console.log(token)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const url = 'https://apis.ccbp.in/movies-app/originals'
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const updateData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        overview: each.overview,
        title: each.title,
      }))
      const moviesListLength = updateData.length
      const index = Math.floor(Math.random() * moviesListLength)
      //   console.log(updateData)
      this.setState({
        apiOriginalStatus: apiStatusConstants.success,
        apiPosterStatus: apiStatusConstants.success,
        originalMovies: updateData,
        posterDetails: updateData[index],
      })
    } else {
      this.setState({
        apiOriginalStatus: apiStatusConstants.failure,
        apiPosterStatus: apiStatusConstants.failure,
      })
    }
  }

  lodingView = () => (
    <div className="loader-container-bg">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  posterSuccessView = () => {
    const {posterDetails} = this.state
    const {backdropPath, title, overview} = posterDetails
    // console.log(posterDetails)

    return (
      <div
        className="movie-item-bg"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <Header />
        <div className="content">
          <h1 className="content-head">{title}</h1>
          <p className="content-para">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  displayPosterView = () => {
    const {apiPosterStatus} = this.state

    switch (apiPosterStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="movie-item-bg">
            <Header />
            {this.lodingView()}
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="movie-item-bg">
            <Header />
            {this.posterFailureView()}
          </div>
        )
      case apiStatusConstants.success:
        return this.posterSuccessView()
      default:
        return null
    }
  }

  posterFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dququtrt4/image/upload/v1671559431/moviesApp/alert-triangle_2_gbchy5.png"
        alt="failure view"
        className="failure-icon"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-btn-try"
        onClick={this.getOriginalMoviesCall}
      >
        Try Again
      </button>
    </div>
  )

  trendingNowSuccess = () => {
    const {trendingMovies} = this.state
    return <ReactSlick movies={trendingMovies} />
  }

  originalSuccessView = () => {
    const {originalMovies} = this.state
    return <ReactSlick movies={originalMovies} />
  }

  getOriginalMoviesCall = () => {
    this.getOriginalMovies()
  }

  originalFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dququtrt4/image/upload/v1671559431/moviesApp/alert-triangle_2_gbchy5.png"
        alt="failure view"
        className="failure-icon"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-btn-try"
        onClick={this.getOriginalMoviesCall}
      >
        Try Again
      </button>
    </div>
  )

  getTrendingMoviesCall = () => {
    this.getTrendingMovies()
  }

  trendingFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dququtrt4/image/upload/v1671559431/moviesApp/alert-triangle_2_gbchy5.png"
        alt="failure view"
        className="failure-icon"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-btn-try"
        onClick={this.getTrendingMoviesCall}
      >
        Try Again
      </button>
    </div>
  )

  trendingSlickView = () => {
    const {apiTrendingStatus} = this.state
    switch (apiTrendingStatus) {
      case apiStatusConstants.inProgress:
        return this.lodingView()
      case apiStatusConstants.success:
        return this.trendingNowSuccess()
      case apiStatusConstants.failure:
        return this.trendingFailureView()
      default:
        return null
    }
  }

  originalSlickView = () => {
    const {apiOriginalStatus} = this.state
    switch (apiOriginalStatus) {
      case apiStatusConstants.inProgress:
        return this.lodingView()
      case apiStatusConstants.success:
        return this.originalSuccessView()
      case apiStatusConstants.failure:
        return this.originalFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-main-bg">
          {this.displayPosterView()}
          <div className="trending-now-container">
            <h1 className="trending-now-head">Trending Now</h1>
            <div className="trending-slick">{this.trendingSlickView()}</div>
          </div>
          <div className="trending-now-container">
            <h1 className="trending-now-head">Originals</h1>
            <div className="trending-slick">{this.originalSlickView()}</div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
