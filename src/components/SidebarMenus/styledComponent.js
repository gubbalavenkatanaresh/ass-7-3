import styled from 'styled-components'

export const Menu = styled.li`
  background-color: ${props => (props.active ? '#f1f5f9' : 'transparent')};
  display: flex;
  align-items: center;
`
export const MenuIcon = styled.img`
  color: ${props => (props.active ? '#ff0000' : '#181818')};
`

export const MenuText = styled.p`
  color: ${props => (props.active ? '#0f0f0f' : '#231f20')};
  margin-left: 10px;
`
