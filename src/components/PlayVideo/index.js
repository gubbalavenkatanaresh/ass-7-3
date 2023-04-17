import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineDislike, AiOutlineLike} from 'react-icons/ai'
import {RiMenuAddFill} from 'react-icons/ri'

import {CustomLike} from './styledComponent'
import ModeContext from '../../context/ModeContext'
import SavedVideosContext from '../../context/SavedVideosContext'
import Navbar from '../Navbar'
import './index.css'
import Sidebar from '../Sidebar'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class PlayVideo extends Component {
  state = {
    isLike: false,
    isDislike: false,
    videoDetails: {},
    presentView: constants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  clickLike = () => {
    this.setState(prevState => ({isLike: !prevState.isLike}))
  }

  clickDislike = () => {
    this.setState(prevState => ({isDislike: !prevState.isDislike}))
  }

  getVideoDetails = async () => {
    this.setState({presentView: constants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const videoId = match.params.id
    const videoUrl = `https://apis.ccbp.in/videos/${videoId}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(videoUrl, options)
    const data = await response.json()
    const updatedData = {
      id: data.video_details.id,
      title: data.video_details.title,
      videoUrl: data.video_details.video_url,
      thumbnailUrl: data.video_details.thumbnail_url,
      channel: data.video_details.channel,
      viewCount: data.video_details.view_count,
      publishedAt: data.video_details.published_at,
      description: data.video_details.description,
    }
    if (response.ok) {
      this.setState({videoDetails: updatedData, presentView: constants.success})
    } else {
      this.setState({presentView: constants.failure})
    }
  }

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
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

  renderSuccessView = () => {
    const {isLike, isDislike, videoDetails} = this.state
    const {
      id,
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails
    const channelDetails = {
      name: channel.name,
      profileImageUrl: channel.profile_image_url,
      subscriberCount: channel.subscriber_count,
    }
    const {name, profileImageUrl, subscriberCount} = channelDetails
    const timeDistance = formatDistanceToNow(new Date(publishedAt))

    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {savedVideos, saveVideo} = value
          const onClickSaveBtn = () => {
            saveVideo(videoDetails)
          }

          const isSaved = savedVideos.some(each => each.id === id)

          return (
            <>
              <ReactPlayer url={videoUrl} />
              <p>{title}</p>
              <div className="views-like">
                <div className="views">
                  <p>{viewCount} views</p>
                  <p>{timeDistance}</p>
                </div>
                <div className="likes">
                  <CustomLike isClicked={isLike} onClick={this.clickLike}>
                    <AiOutlineLike />
                    Like
                  </CustomLike>
                  <CustomLike isClicked={isDislike} onClick={this.clickDislike}>
                    <AiOutlineDislike />
                    Dislike
                  </CustomLike>
                  <CustomLike onClick={onClickSaveBtn} isClicked={isSaved}>
                    <RiMenuAddFill />
                    Save
                  </CustomLike>
                </div>
              </div>
              <hr />
              <div className="bottom">
                <div>
                  <img
                    src={profileImageUrl}
                    alt="profileImage"
                    className="profile"
                  />
                </div>
                <div className="profile-details">
                  <p>{name}</p>
                  <p>{subscriberCount} subscribers</p>
                  <p>{description}</p>
                </div>
              </div>
            </>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }

  renderResultView = () => {
    const {presentView} = this.state
    switch (presentView) {
      case constants.success:
        return this.renderSuccessView()
      case constants.failure:
        return this.renderFailureView()
      case constants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="home-container">
          <Sidebar />
          <div className="video-container">{this.renderResultView()}</div>
        </div>
      </>
    )
  }
}

export default PlayVideo
