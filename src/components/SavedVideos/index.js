import {HiFire} from 'react-icons/hi'
import SavedVideosContext from '../../context/SavedVideosContext'
import TrendingVideo from '../TrendingVideo'
import Navbar from '../Navbar'
import './index.css'

import Sidebar from '../Sidebar'

const SavedVideos = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {savedVideos} = value
      console.log(savedVideos)
      return (
        <>
          <Navbar />
          <div className="home-container">
            <Sidebar />
            <div>
              <div>
                <HiFire />
                <h1>Saved Videos</h1>
              </div>
              <ul>
                {savedVideos.map(eachVideo => (
                  <TrendingVideo key={eachVideo.id} eachVideo={eachVideo} />
                ))}
              </ul>
            </div>
          </div>
        </>
      )
    }}
  </SavedVideosContext.Consumer>
)

export default SavedVideos
