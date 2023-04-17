import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideos: [],
  saveVideo: () => {},
  deleteVideo: () => {},
})

export default SavedVideosContext
