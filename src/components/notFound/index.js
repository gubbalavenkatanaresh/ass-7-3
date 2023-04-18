import ActiveMenuContext from '../../context/ActiveMenuContext'
import ModeContext from '../../context/ModeContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import './index.css'

const NotFound = () => (
  <ActiveMenuContext.Consumer>
    {value => {
      const {changeMenu} = value

      return (
        <ModeContext.Consumer>
          {v => {
            const {isDark} = v
            const imgUrl = isDark
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            return (
              <>
                <Navbar />
                <div className="home-container">
                  <Sidebar />
                  <div className="not-found-container">
                    <img
                      src={imgUrl}
                      alt="not found"
                      className="not-found-img"
                    />
                    <h1>Page Not Found</h1>
                    <p>
                      we are sorry, the page you requested could not be found.
                    </p>
                  </div>
                </div>
              </>
            )
          }}
        </ModeContext.Consumer>
      )
    }}
  </ActiveMenuContext.Consumer>
)

export default NotFound
