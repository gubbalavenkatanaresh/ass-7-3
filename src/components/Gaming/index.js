import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import ModeContext from '../../context/ModeContext'
import {
  TrendingContainer,
  FailureContainer,
  CustomButton,
  FailureImg,
  FailureText,
} from './styledComponent'
import Game from '../Game'
import Navbar from '../Navbar'
import './index.css'
import Sidebar from '../Sidebar'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Gaming extends Component {
  state = {gamesList: [], presentView: constants.initial}

  componentDidMount() {
    this.getGames()
  }

  getGames = async () => {
    this.setState({presentView: constants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response.ok)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({gamesList: updatedData, presentView: constants.success})
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
          <FailureContainer>
            <FailureImg
              src={failureImage}
              alt="failure view"
              className="failure-img"
            />
            <FailureText dark={isDark}>Oops! Something Went Wrong</FailureText>
            <FailureText as="p" dark={isDark}>
              We are having some trouble
            </FailureText>
            <CustomButton type="button" onClick={this.getGames}>
              Retry
            </CustomButton>
          </FailureContainer>
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
    const {gamesList} = this.state
    console.log(gamesList)
    return (
      <ul className="games-list">
        {gamesList.map(eachGame => (
          <Game key={eachGame.title} eachGame={eachGame} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {presentView} = this.state
    console.log(presentView)
    switch (presentView) {
      case constants.failure:
        return this.renderFailureView()
      case constants.success:
        return this.renderSuccessView()
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
            <div data-testid="gaming">
              <Navbar />
              <div className="home-container">
                <Sidebar />
                <div className="home-card">
                  <div>
                    <SiYoutubegaming />
                    <h1>Gaming</h1>
                  </div>
                  <TrendingContainer data-testid="gaming" bgColor={isDark}>
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

export default Gaming
