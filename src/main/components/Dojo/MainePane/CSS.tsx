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
          
          }
        `}
      />
    </>
  )
}

export const Container = styled.div`
  height: 100vh;
  flex-grow: 1;
`
export const BannerContainer = styled.div`
  position: relative;
  height: 70px;
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

export const BodyContainer = styled.div`
  position: absolute;
  column-gap: 2rem;
  min-width: 100%;
  display: flex;
  margin-left: 1.5rem;
  backdrop-filter: blur(10px);
`
export const TrackContainer = styled.div`
  font-weight: bold;
  margin-bottom: 3px;
  padding-right: 2.75rem;
  width: 60rem;
  position: relative;
  font-weight: bold;
  border-width: 1px;
  border-radius: 10px;
  border-color: #99badd;
`
export const EffectsContainer = styled.div`
  max-width: 270px;
`

export const EffectsH2 = styled.h2`
  color: #99badd;
  font-weight: bold;
  margin-bottom: 0.875rem;
`

export const EffectsWrapper = styled.div`
  display: flex;
  column-gap: 0.25rem;
  row-gap; 0.25rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`

export const Effectdiv = styled.div`
  color: #cecece;
  border-radius: 20px;
  border-color: cyan;
  border-width: 1px;  
  padding: 0.625rem 0.875rem 0.625rem 0.875rem;
  margin: 5px;
  font-size; 11px;
  font-weight: bold;
  cursor: default;
  : hover {
    background: grey;
  }
`
