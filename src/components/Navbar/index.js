import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {HiOutlineSun, HiMoon} from 'react-icons/hi'

import {CustomBtn, LogoutContainer, HeaderContainer} from './styledComponent'
import ModeContext from '../../context/ModeContext'
import ActiveMenuContext from '../../context/ActiveMenuContext'
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
        <ActiveMenuContext.Consumer>
          {v => {
            const {changeMenu} = v
            return (
              <HeaderContainer dark={isDark}>
                <Link to="/">
                  <img
                    src={logoUrl}
                    alt="website logo"
                    className="website-logo"
                    onClick={() => changeMenu('HOME')}
                  />
                </Link>

                <ul className="icons-container">
                  <li>
                    <button
                      type="button"
                      data-testid="theme"
                      className="theme-btn"
                    >
                      {modeIcon}
                    </button>
                  </li>
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="profile-icon"
                    />
                  </li>
                  <li>
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
                          <p>Are you sure, you want to logout</p>
                          <div>
                            <CustomBtn
                              outline
                              type="button"
                              onClick={() => close()}
                            >
                              Cancel
                            </CustomBtn>
                            <CustomBtn type="button" onClick={onClickLogout}>
                              Confirm
                            </CustomBtn>
                          </div>
                        </LogoutContainer>
                      )}
                    </Popup>
                  </li>
                </ul>
              </HeaderContainer>
            )
          }}
        </ActiveMenuContext.Consumer>
      )
    }}
  </ModeContext.Consumer>
)

export default withRouter(Navbar)
