import ModeContext from '../../context/ModeContext'
import './index.css'

const FailureView = props => {
  const {clickRetry} = props
  const onClickRetry = () => {
    clickRetry()
  }
  return (
    <ModeContext.Consumer>
      {value => {
        const {isDark} = value
        const failureImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        console.log(isDark)
        return (
          <div className="failure-container">
            <img
              src={failureImage}
              alt="failure view"
              className="failure-img"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button type="button" onClick={onClickRetry} className="retry-btn">
              Retry
            </button>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )
}

export default FailureView
