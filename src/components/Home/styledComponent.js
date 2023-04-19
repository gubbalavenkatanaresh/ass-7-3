import styled from 'styled-components'

export const CustomButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  cursor: pointer;
`
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.bgColor ? '#181818' : '#f9f9f9')};
  color: ${props => (props.bgColor ? '#f1f5f9' : '#1e293b')};
`
export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

export const NoVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const FailureImg = styled.img`
  height: 400px;
  width: 400px;
`

export const FailureText = styled.h1`
  color: ${props => (props.dark ? '#f1f5f9' : '#1e293b')};
`
