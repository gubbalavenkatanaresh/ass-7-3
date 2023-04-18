import styled from 'styled-components'

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  padding: 20px;
  background-color: ${props => (props.dark ? '#1e293b' : '#f1f5f9')};
  color: ${props => (props.dark ? '#f1f5f9' : '#1e293b')};
`
export const CustomButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
`
