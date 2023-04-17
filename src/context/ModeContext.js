import React from 'react'

const ModeContext = React.createContext({
  isDark: false,
  changeMode: () => {},
})

export default ModeContext
