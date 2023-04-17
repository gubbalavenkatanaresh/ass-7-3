import styled from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`

export const CustomBtn = styled.button`
  background-color: ${props => (props.outline ? 'transparent' : '#3b82f6')};
  color: ${props => (props.outline ? ' #cccccc' : '#ffffff')};
  font-weight: 500;
  border: ${props => (props.outline ? '1px  #cccccc solid' : 'none')};
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;
  padding: 10px;
`

export const LogoutContainer = styled.div`
  background-color: ${props => (props.mode ? '#1e293b' : '#f1f1f1')};
  border-radius: 20px;
  padding: 24px;
  color: ${props => (props.mode ? '#ffffff' : '#1e293b')};
`
