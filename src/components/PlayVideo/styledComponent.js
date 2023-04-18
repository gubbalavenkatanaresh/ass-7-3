import styled from 'styled-components'

export const CustomLike = styled.button`
  color: ${props => (props.isClicked ? '#2563eb' : '#64748b')};
  cursor: pointer;
  background: none;
  border: none;
`
export const CustomContainer = styled.div`
  display: flex;
`

export const CustomButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
`
export const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.bgColor ? '#0f0f0f' : '#f9f9f9')};
`
