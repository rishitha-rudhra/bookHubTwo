import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  pending: 'PENDING',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: apiStatusConst.initial,
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConst.pending})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwtToken')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()
    if (response.ok === true) {
      const book = data.book_details
      const bookDetails = {
        id: book.id,
        title: book.title,
        aboutAuthor: book.about_author,
        aboutBook: book.about_book,
        authorName: book.author_name,
        rating: book.rating,
        coverPic: book.cover_pic,
        readStatus: book.read_status,
      }

      this.setState({apiStatus: apiStatusConst.success, bookDetails})
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  componentDidMount = () => {
    this.getBookDetails()
  }

  renderBookDetails = () => {
    const {bookDetails} = this.state
    const {
      title,
      coverPic,
      readStatus,
      authorName,
      aboutAuthor,
      aboutBook,
      rating,
    } = bookDetails

    return (
      <div className="book-details-container">
        <div className="book-basic-details">
          <img src={coverPic} alt={title} className="book-cover-image" />
          <div className="book-details-text-container">
            <p className="book-title">{title}</p>
            <p className="book-author-name remove-margin">{authorName}</p>
            <p className="remove-margin">
              Avg Rating <BsFillStarFill className="star-icon" /> {rating}
            </p>
            <p>
              Status: <span className="read-status">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="border-line" />
        <p className="book-title">About Author</p>
        <p>{aboutAuthor}</p>
        <p className="book-title">About Book</p>
        <p>{aboutBook}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <div className="book-details-page">
        <Header />
        {apiStatus === apiStatusConst.success && this.renderBookDetails()}
        {apiStatus === apiStatusConst.failure && <FailureView />}
        {apiStatus === apiStatusConst.pending && this.renderLoadingView()}

        <Footer />
      </div>
    )
  }
}

export default BookDetails
