import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import format from 'date-fns/format'
import Footer from '../Footer'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class MovieDetails extends Component {
  state = {
    movieDetailsObj: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.getMovieDetails(id)
  }

  getMovieDetails = async id => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    // console.log(id)

    const token = Cookies.get('jwt_token')
    // console.log(token)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const movieDetails = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,

        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,

        genres: data.movie_details.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),

        spokenLanguages: data.movie_details.spoken_languages.map(each => ({
          id: each.id,
          englishName: each.english_name,
        })),
        similarMovies: data.movie_details.similar_movies.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        })),
      }

      //   console.log(movieDetails)
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetailsObj: movieDetails,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  lodingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  renderFailureView = () => (
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
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  moviesDetailsSuccessView = () => {
    const {movieDetailsObj} = this.state
    const {
      backdropPath,
      title,
      overview,
      spokenLanguages,
      genres,
      releaseDate,
      budget,
      voteCount,
      similarMovies,
      voteAverage,
      adult,
      runtime,
    } = movieDetailsObj
    // console.log(movieDetailsObj)

    const hours = Math.floor(runtime / 60)
    const mins = runtime - hours * 60
    const movieTime = `${hours}h ${mins}m`

    const adultRating = adult ? 'A' : 'U/A'

    const year = format(new Date(releaseDate), 'yyyy')
    // console.log(year)

    return (
      <>
        <div
          className="movie-item-bg"
          style={{backgroundImage: `url("${backdropPath}")`}}
        >
          <Header />
          <div className="movie-details-bg">
            <h1 className="movie-title">{title}</h1>
            <div className="time-container">
              <p className="runtime">{movieTime}</p>
              <p className="adult-rating">{adultRating}</p>
              <p className="runtime">{year}</p>
            </div>
            <p className="movie-overview">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="movie-info-table">
          <ul className="movie-info-sub">
            <h1 className="sub-heading">genres</h1>
            {genres.map(each => (
              <p key={each.id} className="info-details">
                {each.name}
              </p>
            ))}
          </ul>
          <ul className="movie-info-sub">
            <h1 className="sub-heading">Audio Available</h1>
            {spokenLanguages.map(each => (
              <p key={each.id} className="info-details">
                {each.englishName}
              </p>
            ))}
          </ul>
          <ul className="movie-info-sub">
            <div className="movie-info-sub-rating">
              <h1 className="sub-heading">Rating Count</h1>
              <p className="info-details">{voteCount}</p>
            </div>
            <div className="movie-info-sub-rating">
              <h1 className="sub-heading">Rating Average</h1>
              <p className="info-details">{voteAverage}</p>
            </div>
          </ul>
          <ul className="movie-info-sub">
            <div className="movie-info-sub-rating">
              <h1 className="sub-heading">Budget</h1>
              <p className="info-details">{budget}</p>
            </div>
            <div className="movie-info-sub-rating">
              <h1 className="sub-heading">Release Date</h1>
              <p className="info-details">{releaseDate}</p>
            </div>
          </ul>
        </div>
        <div className="similar-movies-bg">
          <h1 className="more-like-this-head">More like this</h1>
          <ul className="movies-similar-list">
            {similarMovies.map(each => {
              const getMovieDetailsAgain = () => {
                this.getMovieDetails(each.id)
              }
              return (
                <li
                  key={each.id}
                  className="each-movie"
                  onClick={getMovieDetailsAgain}
                >
                  <Link to={`/movies/${each.id}`} className="movie-link">
                    <img
                      src={each.posterPath}
                      alt={each.title}
                      className="movie-img"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  }

  renderMovieDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <>
            <Header />
            {this.lodingView()}
          </>
        )
      case apiStatusConstants.failure:
        return (
          <>
            <Header />
            {this.renderFailureView()}
          </>
        )

      case apiStatusConstants.success:
        return this.moviesDetailsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="movie-bg">{this.renderMovieDetailsView()}</div>
        <Footer />
      </>
    )
  }
}

export default MovieDetails
