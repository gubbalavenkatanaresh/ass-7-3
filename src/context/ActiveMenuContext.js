import React from 'react'

const ActiveMenuContext = React.createContext({
  activeMenu: 'INITIAL',
  changeMenu: () => {},
})

export default ActiveMenuContext
