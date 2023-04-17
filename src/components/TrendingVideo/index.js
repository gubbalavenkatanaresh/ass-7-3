import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'
import ActiveMenuContext from '../../context/ActiveMenuContext'
import './index.css'

const TrendingVideo = props => {
  const {eachVideo} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = eachVideo
  const distanceTime = formatDistanceToNow(new Date(publishedAt))
  const channelDetails = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name} = channelDetails
  return (
    <ActiveMenuContext.Consumer>
      {value => {
        const {changeMenu} = value
        const onClickVideo = () => {
          changeMenu('INITIAL')
        }
        return (
          <Link to={`/videos/${id}`}>
            <li className="video-details" onClick={onClickVideo}>
              <img src={thumbnailUrl} alt="thumbnail" className="thumbnail" />
              <div>
                <p>{title}</p>
                <p>{name}</p>
                <div>
                  <p>{viewCount} views</p>
                  <p>{distanceTime}</p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ActiveMenuContext.Consumer>
  )
}

export default TrendingVideo
