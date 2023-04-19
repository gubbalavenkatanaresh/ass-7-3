import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {HiFire} from 'react-icons/hi'
import ModeContext from '../../context/ModeContext'
import {TrendingContainer, CustomButton} from './styledComponent'
import TrendingVideo from '../TrendingVideo'
import Navbar from '../Navbar'
import './index.css'
import Sidebar from '../Sidebar'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Trending extends Component {
  state = {presentView: constants.initial, trendingVideos: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  clickRetry = () => {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({presentView: constants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channel: eachVideo.channel,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        trendingVideos: updatedData,
        presentView: constants.success,
      })
    } else {
      this.setState({presentView: constants.failure})
    }
  }

  renderFailureView = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDark} = value
        const failureImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        console.log(isDark)
        return (
          <div className="failure-container">
            <img src={failureImage} alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <CustomButton
              type="button"
              onClick={this.getTrendingVideos}
              className="retry-btn"
            >
              Retry
            </CustomButton>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {trendingVideos} = this.state
    return (
      <ul>
        {trendingVideos.map(eachVideo => (
          <TrendingVideo key={eachVideo.thumbnail_url} eachVideo={eachVideo} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {presentView} = this.state
    switch (presentView) {
      case constants.success:
        return this.renderSuccessView()
      case constants.failure:
        return this.renderFailureView()
      case constants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <ModeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div data-testid="trending">
              <Navbar />
              <div className="home-container">
                <Sidebar />
                <div className="home-card">
                  <div>
                    <HiFire />
                    <h1>Trending</h1>
                  </div>
                  <TrendingContainer bgColor={isDark} data-testid="trending">
                    {this.renderResult()}
                  </TrendingContainer>
                </div>
              </div>
            </div>
          )
        }}
      </ModeContext.Consumer>
    )
  }
}

export default Trending
