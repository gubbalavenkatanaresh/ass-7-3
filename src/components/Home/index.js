import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

import {CustomButton, HomeContainer, BannerContainer} from './styledComponent'
import Video from '../Video'

import ModeContext from '../../context/ModeContext'
import FailureView from '../FailureView'

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

  clickRetry = () => {
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

  failureView = () => <FailureView clickRetry={this.clickRetry} />

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
                  <HomeContainer bgColor={isDark} data-testid="home">
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
