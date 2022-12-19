import './index.css'

import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  render() {
    return (
      <>
        <div className="home-main-bg">
          <Header />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
