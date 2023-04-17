import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

import {CustomButton, HomeContainer} from './styledComponent'
import Video from '../Video'

import ModeContext from '../../context/ModeContext'

import Navbar from '../Navbar'
import './index.css'
import Sidebar from '../Sidebar'

const renderConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    showBanner: true,
    searchValue: '',
    isLoading: renderConstants.initial,
    videosList: [],
  }

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({isLoading: renderConstants.inProgress})
    const {searchValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchValue}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({videosList: data, isLoading: renderConstants.success})
    } else {
      this.setState({isLoading: renderConstants.failure})
    }
  }

  pressEnter = event => {
    if (event.key === 'Enter') {
      this.getVideos()
    }
  }

  clickSearchIcon = () => {
    this.getVideos()
  }

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <ModeContext.Consumer>
      {value => {
        const {isDark} = value
        const failureImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="failure-container">
            <img src={failureImage} alt="failureImage" />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having same trouble to complete your request.</p>
            <p>Please try again.</p>
            <button type="button">Retry</button>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  successView = () => {
    const {videosList} = this.state
    const videos = videosList.videos.map(eachVideo => ({
      id: eachVideo.id,
      title: eachVideo.title,
      thumbnailUrl: eachVideo.thumbnail_url,
      channel: eachVideo.channel,
      viewCount: eachVideo.view_count,
      publishedAt: eachVideo.published_at,
    }))

    return videosList.total === 0 ? (
      <HomeContainer>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="no-videos-img"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <CustomButton>Retry</CustomButton>
      </HomeContainer>
    ) : (
      <ul className="videos-list">
        {videos.map(eachVideo => (
          <Video key={eachVideo.id} eachVideo={eachVideo} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case renderConstants.inProgress:
        return this.loadingView()
      case renderConstants.failure:
        return this.failureView()
      case renderConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    const {showBanner, searchValue} = this.state

    return (
      <ModeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <Navbar />
              <div className="home-container">
                <Sidebar />
                <div className="home-card">
                  {showBanner && (
                    <div className="banner-container">
                      <div>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="logo"
                          className="website-logo"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button type="button">GET IT</button>
                      </div>
                      <AiOutlineClose
                        className="close-icon"
                        onClick={this.closeBanner}
                      />
                    </div>
                  )}
                  <div className="search-input-container">
                    <input
                      type="search"
                      className="search-input"
                      value={searchValue}
                      onKeyDown={this.pressEnter}
                      onChange={this.onChangeSearch}
                    />
                    <AiOutlineSearch
                      className="search-icon"
                      onClick={this.clickSearchIcon}
                    />
                  </div>
                  <HomeContainer>{this.renderResult()}</HomeContainer>
                </div>
              </div>
            </>
          )
        }}
      </ModeContext.Consumer>
    )
  }
}

export default Home
