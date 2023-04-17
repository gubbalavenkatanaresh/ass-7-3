import styled from 'styled-components'

export const CustomLike = styled.p`
  color: ${props => (props.isClicked ? '#3b82f6' : '#212121')};
  cursor: pointer;
`
export const CustomContainer = styled.div`
  display: flex;
`
