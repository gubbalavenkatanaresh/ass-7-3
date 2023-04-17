import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {HiOutlineSun, HiMoon} from 'react-icons/hi'

import {Nav, CustomBtn, LogoutContainer} from './styledComponent'
import ModeContext from '../../context/ModeContext'
import './index.css'

const Navbar = props => (
  <ModeContext.Consumer>
    {value => {
      const {isDark, changeMode} = value
      const onClickModeIcon = () => {
        changeMode()
      }
      const logoUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      const modeIcon = isDark ? (
        <HiOutlineSun color="#ffffff" size={23} onClick={onClickModeIcon} />
      ) : (
        <HiMoon size={23} onClick={onClickModeIcon} />
      )

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <Nav>
          <Link to="/">
            <img src={logoUrl} alt="logo" className="website-logo" />
          </Link>

          <div className="icons-container">
            {modeIcon}
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile-icon"
            />
            <Popup
              modal
              trigger={
                <button type="button" className="logout-btn">
                  Logout
                </button>
              }
              className="popup-content"
            >
              {close => (
                <LogoutContainer mode={isDark}>
                  <p>Are you sure,you want to logout?</p>
                  <div>
                    <CustomBtn outline type="button" onClick={() => close()}>
                      Cancel
                    </CustomBtn>
                    <CustomBtn type="button" onClick={onClickLogout}>
                      Confirm
                    </CustomBtn>
                  </div>
                </LogoutContainer>
              )}
            </Popup>
          </div>
        </Nav>
      )
    }}
  </ModeContext.Consumer>
)

export default withRouter(Navbar)
