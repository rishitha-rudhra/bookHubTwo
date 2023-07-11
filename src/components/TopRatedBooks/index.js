import React, {Component} from 'react'
import Slider from 'react-slick'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class TopRatedBooks extends Component {
  renderSlider = () => {
    const {topRatedBooksList} = this.props

    return (
      <Slider {...settings}>
        {topRatedBooksList.map(eachBook => {
          const {id, title, authorName, coverPic} = eachBook
          return (
            <div className="slick-item" key={id}>
              <img className="book-image" src={coverPic} alt={title} />
              <p className="book-title">{title}</p>
              <p className="book-author">{authorName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default TopRatedBooks
