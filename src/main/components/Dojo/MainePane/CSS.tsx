import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"
import { useTheme } from "../../../hooks/useTheme"

export const MainCSS = () => {
  const theme = useTheme()
  return (
    <>
      <Global
        styles={css`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      />
    </>
  )
}

export const Container = styled.div`
  height: 100vh;
  flex-grow: 1;
  overflow: scroll;
  backdrop-filter: blur(10px);
`
export const BannerContainer = styled.div`
  position: relative;
  height: 60px;
  opacity: 0.5;
`
export const BannerImg = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`
export const TabList = styled.div`
  list-style: none;
  margin: 0 20px;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: 25px;
  justify-content: space-between;
  text-align: center;
  border-radius: 15px;
  border: red 5px solid;
`
