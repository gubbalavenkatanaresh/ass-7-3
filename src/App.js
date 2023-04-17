import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import ModeContext from './context/ModeContext'
import ActiveMenuContext from './context/ActiveMenuContext'
import SavedVideosContext from './context/SavedVideosContext'
import Login from './components/Login'
import Home from './components/Home'
import PlayVideo from './components/PlayVideo'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import './App.css'

const activeMenuConstants = {
  initial: 'INITIAL',
  home: 'HOME',
  trending: 'TREADING',
  gaming: 'GAMING',
  savedVideos: 'SAVEDVIDEOS',
}

class App extends Component {
  state = {isDark: false, activeMenu: activeMenuConstants.home, savedVideos: []}

  changeMode = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  changeMenu = activeMenu => {
    this.setState({activeMenu})
  }

  saveVideo = videoDetails => {
    const {id} = videoDetails
    const {savedVideos} = this.state
    const isNotSaved = savedVideos.filter(eachVideo => eachVideo.id === id)
    console.log(isNotSaved.length)
    if (isNotSaved.length === 0) {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, videoDetails],
      }))
    } else {
      this.setState(prevState => ({
        savedVideos: prevState.savedVideos.filter(
          eachVideo => eachVideo.id !== id,
        ),
      }))
    }
  }

  render() {
    const {isDark, activeMenu, savedVideos} = this.state
    return (
      <ModeContext.Provider value={{isDark, changeMode: this.changeMode}}>
        <ActiveMenuContext.Provider
          value={{activeMenu, changeMenu: this.changeMenu}}
        >
          <SavedVideosContext.Provider
            value={{savedVideos, saveVideo: this.saveVideo}}
          >
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route exact path="/videos/:id" component={PlayVideo} />
              <Route exact path="/trending" component={Trending} />
              <Route exact path="/gaming" component={Gaming} />
              <Route exact path="/saved-videos" component={SavedVideos} />
            </Switch>
          </SavedVideosContext.Provider>
        </ActiveMenuContext.Provider>
      </ModeContext.Provider>
    )
  }
}

export default App
