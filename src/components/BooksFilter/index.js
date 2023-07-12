import './index.css'

const BooksFilter = props => {
  const {bookshelvesList, onChangeBooksType, booksType} = props

  return (
    <ul className="books-type-list">
      {bookshelvesList.map(eachItem => {
        const changeBooksType = () => {
          onChangeBooksType(eachItem.value)
        }

        const activeFilterClass =
          booksType === eachItem.value ? 'active-books-type' : ''

        return (
          <li key={eachItem.id}>
            <button
              type="button"
              onClick={changeBooksType}
              className={`books-type-item ${activeFilterClass}`}
            >
              {eachItem.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default BooksFilter
