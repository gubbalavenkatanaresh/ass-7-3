import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.dark ? '#1e293b' : '#ffffff')};
`

export const NotFoundText = styled.h1`
  color: ${props => (props.dark ? '#ffffff' : '#1e293b')};
`
