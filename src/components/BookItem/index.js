import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {booksList} = props

  return (
    <ul className="book-items-container">
      {booksList.map(eachBook => {
        const {title, authorName, id, rating, coverPic, readStatus} = eachBook
        return (
          <Link to={`/books/${id}`} className="link-element">
            <li key={id} className="book-card">
              <img src={coverPic} alt={title} className="book-cover-pic" />
              <div className="book-details">
                <p className="book-title">{title}</p>
                <p className="book-author-name">{authorName}</p>
                <p className="book-rating">
                  Avg Rating <BsFillStarFill className="star-icon" /> {rating}
                </p>
                <p className="book-rating">
                  Status: <span className="read-status">{readStatus}</span>
                </p>
              </div>
            </li>
          </Link>
        )
      })}
    </ul>
  )
}

export default BookItem
