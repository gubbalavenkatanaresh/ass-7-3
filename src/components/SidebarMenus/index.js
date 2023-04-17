import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'

import ActiveMenuContext from '../../context/ActiveMenuContext'
import {Menu, MenuText} from './styledComponent'

const activeMenuConstants = {
  initial: 'INITIAL',
  home: 'HOME',
  trending: 'TREADING',
  gaming: 'GAMING',
  savedVideos: 'SAVEDVIDEOS',
}

const SidebarMenus = () => (
  <ActiveMenuContext.Consumer>
    {value => {
      const {activeMenu, changeMenu} = value
      return (
        <ul className="menu-list">
          <Link to="/">
            <Menu
              active={activeMenu === activeMenuConstants.home}
              onClick={() => changeMenu(activeMenuConstants.home)}
            >
              <AiFillHome
                color={
                  activeMenu === activeMenuConstants.home
                    ? '#ff0000'
                    : '#181818'
                }
              />
              <MenuText active={activeMenu === activeMenuConstants.home}>
                Home
              </MenuText>
            </Menu>
          </Link>
          <Link to="/trending">
            <Menu
              active={activeMenu === activeMenuConstants.trending}
              onClick={() => changeMenu(activeMenuConstants.trending)}
            >
              <HiFire
                color={
                  activeMenu === activeMenuConstants.trending
                    ? '#ff0000'
                    : '#181818'
                }
              />
              <MenuText active={activeMenu === activeMenuConstants.trending}>
                Trending
              </MenuText>
            </Menu>
          </Link>
          <Link to="/gaming">
            <Menu
              active={activeMenu === activeMenuConstants.gaming}
              onClick={() => changeMenu(activeMenuConstants.gaming)}
            >
              <SiYoutubegaming
                color={
                  activeMenu === activeMenuConstants.gaming
                    ? '#ff0000'
                    : '#181818'
                }
              />
              <MenuText active={activeMenu === activeMenuConstants.gaming}>
                Gaming
              </MenuText>
            </Menu>
          </Link>
          <Link to="/saved-videos">
            <Menu
              active={activeMenu === activeMenuConstants.savedVideos}
              onClick={() => changeMenu(activeMenuConstants.savedVideos)}
            >
              <RiMenuAddFill
                color={
                  activeMenu === activeMenuConstants.savedVideos
                    ? '#ff0000'
                    : '#181818'
                }
              />
              <MenuText active={activeMenu === activeMenuConstants.savedVideos}>
                Saved videos
              </MenuText>
            </Menu>
          </Link>
        </ul>
      )
    }}
  </ActiveMenuContext.Consumer>
)

export default SidebarMenus
