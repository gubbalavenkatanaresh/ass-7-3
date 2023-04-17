import {Link} from 'react-router-dom'
import './index.css'

const Game = props => {
  const {eachGame} = props
  const {id, title, thumbnailUrl, viewCount} = eachGame
  return (
    <Link to={`/videos/${id}`} className="game-container">
      <li>
        <img src={thumbnailUrl} alt="thumbnail" className="game-thumbnail" />
        <h1>{title}</h1>
        <p>{viewCount} Watching Worldwide</p>
      </li>
    </Link>
  )
}

export default Game
