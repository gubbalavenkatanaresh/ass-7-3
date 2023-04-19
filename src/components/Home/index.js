import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

import {
  CustomButton,
  HomeContainer,
  BannerContainer,
  NoVideosContainer,
  FailureImg,
  FailureText,
} from './styledComponent'
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
    if (response.ok) {
      const data = await response.json()
      const videos = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channel: eachVideo.channel,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({videosList: videos, isLoading: renderConstants.success})
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
            <CustomButton
              type="button"
              onClick={this.getVideos}
              className="retry-btn"
            >
              Retry
            </CustomButton>
          </div>
        )
      }}
    </ModeContext.Consumer>
  )

  successView = () => {
    const {videosList} = this.state
    if (videosList.length === 0) {
      return (
        <NoVideosContainer>
          <FailureImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <FailureText>No Search results found</FailureText>
          <FailureText as="p">
            Try different key words or remove search filter
          </FailureText>
          <CustomButton onClick={this.getVideos}>Retry</CustomButton>
        </NoVideosContainer>
      )
    }
    return (
      <ul className="videos-list">
        {videosList.map(eachVideo => (
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
            <div data-testid="home">
              <Navbar />
              <div className="home-container">
                <Sidebar />
                <div className="home-card">
                  {showBanner && (
                    <BannerContainer data-testid="banner">
                      <div>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="website-logo"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button type="button">GET IT NOW</button>
                      </div>
                      <button
                        type="button"
                        data-testid="close"
                        onClick={this.closeBanner}
                      >
                        <AiOutlineClose className="close-icon" />
                      </button>
                    </BannerContainer>
                  )}
                  <HomeContainer data-testid="home" bgColor={isDark}>
                    <div>
                      <div className="search-input-container">
                        <input
                          type="search"
                          className="search-input"
                          value={searchValue}
                          onKeyDown={this.pressEnter}
                          onChange={this.onChangeSearch}
                        />
                        <button
                          type="button"
                          onClick={this.clickSearchIcon}
                          data-testid="searchButton"
                        >
                          <AiOutlineSearch className="search-icon" />
                        </button>
                      </div>

                      {this.renderResult()}
                    </div>
                  </HomeContainer>
                </div>
              </div>
            </div>
          )
        }}
      </ModeContext.Consumer>
    )
  }
}

export default Home
