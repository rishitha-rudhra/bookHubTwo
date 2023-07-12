import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import BooksFilter from '../BooksFilter'
import BookItem from '../BookItem'
import FailureView from '../FailureView'
import Footer from '../Footer'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  pending: 'PENDING',
  failure: 'FAILURE',
}

class BookShelves extends Component {
  state = {
    booksType: 'ALL',
    searchInput: '',
    booksList: [],
    apiStatus: apiStatusConst.initial,
  }

  getBooksList = async () => {
    this.setState({apiStatus: apiStatusConst.pending})
    const {searchInput, booksType} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${booksType}&search=${searchInput}`
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const {books} = data

      const formattedBooks = books.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        rating: eachItem.rating,
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        readStatus: eachItem.read_status,
      }))

      this.setState({
        booksList: formattedBooks,
        apiStatus: apiStatusConst.success,
        searchInput: '',
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  componentDidMount = () => {
    this.getBooksList()
  }

  onClickSearch = () => {
    this.getBooksList()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.getBooksList()
    }
  }

  renderNoBooksView = () => {
    const {searchInput} = this.state

    return (
      <div className="no-books-container">
        <img
          src="https://res.cloudinary.com/dq35rpgor/image/upload/v1689161193/Asset_1_1_kkxm8j.png"
          alt="no books"
          className="no-books-img"
        />
        <p className="failure-text">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state

    return (
      <div className="search-bar">
        <input
          type="search"
          value={searchInput}
          className="search-input-ele"
          onChange={this.onChangeSearch}
          onKeyDown={this.onKeyDownSearch}
        />
        <button
          className="search-icon-btn"
          type="button"
          onClick={this.onClickSearch}
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  onChangeBooksType = value => {
    this.setState({booksType: value}, this.getBooksList)
  }

  findActiveFilterLabel = () => {
    const {booksType} = this.state
    const activeLabelObj = bookshelvesList.filter(
      eachItem => eachItem.value === booksType,
    )
    const activeLabel = activeLabelObj[0].label
    return activeLabel
  }

  renderBooksFilterForLargeDevices = () => {
    const {booksType} = this.state

    return (
      <ul className="lg-books-filter">
        <h1 className="filters-heading">BookShelves</h1>
        {bookshelvesList.map(eachItem => {
          const changeBooksType = () => {
            this.onChangeBooksType(eachItem.value)
          }

          const activeItemClass =
            booksType === eachItem.value ? 'active-filter-item' : ''

          return (
            <li key={eachItem.id}>
              <button
                type="button"
                className={`filter-btn ${activeItemClass}`}
                onClick={changeBooksType}
              >
                {eachItem.label}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderShelfBodySection = () => {
    const {booksType, booksList} = this.state

    const activeLabel = this.findActiveFilterLabel()

    return (
      <div className="shelf-body-section">
        {this.renderBooksFilterForLargeDevices()}
        <div className="books-shelf-section">
          <div className="search-and-books-type-container">
            {this.renderSearchContainer()}
            <p className="books-type-text">{activeLabel} Books</p>
            <BooksFilter
              bookshelvesList={bookshelvesList}
              onChangeBooksType={this.onChangeBooksType}
              booksType={booksType}
            />
          </div>
          {booksList.length !== 0 ? (
            <BookItem booksList={booksList} />
          ) : (
            this.renderNoBooksView()
          )}
        </div>
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
      <div className="shelf-container">
        <Header activeTab="shelf" />
        {apiStatus === apiStatusConst.success && this.renderShelfBodySection()}
        {apiStatus === apiStatusConst.pending && this.renderLoadingView()}
        {apiStatus === apiStatusConst.failure && <FailureView />}
        <Footer />
      </div>
    )
  }
}

export default BookShelves
