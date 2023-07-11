import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import TopRatedBooks from '../TopRatedBooks'
import './index.css'
import Footer from '../Footer'

class Home extends Component {
  state = {
    topRatedBooksList: [],
  }

  getTopRatedBooks = async () => {
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
      this.setState({topRatedBooksList})
    }
  }

  componentDidMount = () => {
    this.getTopRatedBooks()
  }

  render() {
    const {topRatedBooksList} = this.state
    return (
      <div className="home-container">
        <Header />
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
              <button type="button" className="logout-btn">
                Find books
              </button>
            </div>
            <TopRatedBooks topRatedBooksList={topRatedBooksList} />
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
