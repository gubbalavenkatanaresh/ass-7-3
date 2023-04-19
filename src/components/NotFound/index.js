import ModeContext from '../../context/ModeContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import './index.css'
import {NotFoundContainer, NotFoundText} from './styledComponent'

const NotFound = () => (
  <ModeContext.Consumer>
    {value => {
      const {isDark} = value
      const imgUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <>
          <Navbar />
          <div className="home-container">
            <Sidebar />
            <NotFoundContainer dark={isDark}>
              <img src={imgUrl} alt="not found" className="not-found-img" />
              <NotFoundText dark={isDark}>Page Not Found</NotFoundText>
              <NotFoundText as="p" dark={isDark}>
                we are sorry, the page you requested could not be found.
              </NotFoundText>
            </NotFoundContainer>
          </div>
        </>
      )
    }}
  </ModeContext.Consumer>
)

export default NotFound
