import SidebarMenus from '../SidebarMenus'
import ModeContext from '../../context/ModeContext'
import './index.css'

const Sidebar = () => (
  <ModeContext.Consumer>
    {value => {
      const {isDark} = value
      return (
        <div className="sidebar-container">
          <SidebarMenus />
          <div>
            <h1>CONTACT US</h1>
            <div className="logo-img">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </ModeContext.Consumer>
)

export default Sidebar
