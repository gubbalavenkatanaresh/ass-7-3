import {HiFire} from 'react-icons/hi'
import SavedVideosContext from '../../context/SavedVideosContext'
import TrendingVideo from '../TrendingVideo'
import Navbar from '../Navbar'
import ModeContext from '../../context/ModeContext'
import './index.css'
import {TrendingContainer} from './styledComponent'

import Sidebar from '../Sidebar'

const SavedVideos = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {savedVideos} = value
      console.log(savedVideos)
      return (
        <ModeContext.Consumer>
          {v => {
            const {isDark} = v
            return (
              <div data-testid="savedVideos">
                <Navbar />
                <div className="home-container">
                  <Sidebar />
                  <div className="home-card">
                    <div>
                      <HiFire />
                      <h1>Saved Videos</h1>
                    </div>
                    <TrendingContainer
                      data-testid="savedVideos"
                      bgColor={isDark}
                    >
                      {savedVideos.length === 0 ? (
                        <div className="no-videos-container">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                            alt="no saved videos"
                            className="no-videos-img"
                          />
                          <h1>No saved videos found</h1>
                          <p>You can save your videos while watching them</p>
                        </div>
                      ) : (
                        <ul>
                          {savedVideos.map(eachVideo => (
                            <TrendingVideo
                              key={eachVideo.id}
                              eachVideo={eachVideo}
                            />
                          ))}
                        </ul>
                      )}
                    </TrendingContainer>
                  </div>
                </div>
              </div>
            )
          }}
        </ModeContext.Consumer>
      )
    }}
  </SavedVideosContext.Consumer>
)

export default SavedVideos
