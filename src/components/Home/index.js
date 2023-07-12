import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import TopRatedBooks from '../TopRatedBooks'
import './index.css'
import Footer from '../Footer'
import FailureView from '../FailureView'

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  pending: 'PENDING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    topRatedBooksList: [],
    apiStatus: apiStatusConst.initial,
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessOrFailureView = () => {
    const {topRatedBooksList, apiStatus} = this.state
    return (
      <div className="hm-body-container">
        <h1 className="hm-heading">Find Your Next Favorite Books?</h1>
        <p className="hm-description">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div className="top-rated-books">
          <div className="find-books-section">
            <p className="top-rated-heading">Top Rated Books</p>
            <button
              type="button"
              className="logout-btn"
              onClick={this.onClickFindBooks}
            >
              Find books
            </button>
          </div>
          {apiStatus === apiStatusConst.success ? (
            <TopRatedBooks topRatedBooksList={topRatedBooksList} />
          ) : (
            <FailureView tryAgain={this.tryAgain} />
          )}
        </div>
        <Footer />
      </div>
    )
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConst.pending})

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const topRated = data.books
    const topRatedBooksList = topRated.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      authorName: eachItem.author_name,
      coverPic: eachItem.cover_pic,
    }))
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConst.success, topRatedBooksList})
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  componentDidMount = () => {
    this.getTopRatedBooks()
  }

  tryAgain = () => {
    this.getTopRatedBooks()
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="home-container">
        <Header activeTab="home" />
        {apiStatus === apiStatusConst.pending
          ? this.renderLoadingView()
          : this.renderSuccessOrFailureView()}
      </div>
    )
  }
}

export default Home
