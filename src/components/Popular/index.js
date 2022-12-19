import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

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

  getPopularMovies = () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
  }

  lodingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  popularViewSucces = () => (
    <ul className="popular-movies-container">
      <li>image</li>
    </ul>
  )

  popularViewFailure = () => <h1>fdf</h1>

  popularView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.lodingView()
      case apiStatusConstants.success:
        return this.popularViewSucces()
      case apiStautsConstants.failure:
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
        </div>
        <Footer />
      </>
    )
  }
}

export default Popular
