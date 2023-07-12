import './index.css'

const FailureView = props => {
  const onClickTryAgain = () => {
    const {tryAgain} = props
    tryAgain()
  }

  return (
    <div className="api-failure-container">
      <img
        src="https://res.cloudinary.com/dq35rpgor/image/upload/v1689152869/Group_7522_wn8n0y.png"
        className="failure-img"
        alt="failure logo"
      />
      <p className="failure-text">Something went wrong, Please try again.</p>
      <button type="button" className="logout-btn" onClick={onClickTryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
