import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'
import ActiveMenuContext from '../../context/ActiveMenuContext'
import './index.css'

const Video = props => {
  const {eachVideo} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = eachVideo
  const distanceTime = formatDistanceToNow(new Date(publishedAt))
  const channelDetails = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name, profileImageUrl} = channelDetails
  return (
    <ActiveMenuContext.Consumer>
      {value => {
        const {changeMenu} = value
        const onClickVideo = () => {
          changeMenu('INITIAL')
        }
        return (
          <Link to={`/videos/${id}`}>
            <li className="video-container" onClick={onClickVideo}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail"
              />
              <div className="video-details">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profile"
                />
                <div>
                  <p>{title}</p>
                  <p>{name}</p>
                  <div>
                    <p>{viewCount}</p>
                    <p>{distanceTime}</p>
                    <p>{publishedAt}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ActiveMenuContext.Consumer>
  )
}

export default Video
