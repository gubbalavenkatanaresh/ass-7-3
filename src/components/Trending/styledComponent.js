import styled from 'styled-components'

export const CustomButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  cursor: pointer;
`
export const TrendingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.bgColor ? '#0f0f0f' : '#f9f9f9')};
`
export const SidebarInSmall = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`
