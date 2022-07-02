import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"
import { useTheme } from "../../../hooks/useTheme"

export const TrackPlayerCSS = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .volumeIcon {
          margin-top: 1px;
        }
      `}
    />
  )
}

export const Container = styled.div`
  position: absolute;
  bottom: 4%;
  left: 5%;
  padding-top: 20px;
  height: 10rem;
  width: 100%;
`
export const Top = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  margin-y: 2rem;
`
export const TopImg = styled.img`
  width: 50px !important;
`
export const PTag = styled.p`
  margin-left: 10px;
  color: #f1f1f1;
  font-size: 14px;
  overflow-x: scroll;
  flex-wrap: nowrap;
`
export const Artist = styled.span`
  padding-top: 5px;
  display: block;
  font-size; 12px;
  color: #848484;
`

export const Bottom = styled.div`
  position: relative;
  top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Icon = styled.i`
  font-size: 12px;
  :hover {
    color: #f1f1f1;
    transition: 0.3s;
    cursor: pointer;
  }
`
export const VolumeDial = styled.input`
  border: #c7c7c7 1px solid;
  height: 2px;
  width: 150px;
  justify-content: center;
  background-color: #c0c0c0;
  border-radius: 10px;
  :hover {
    background-color: white;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 15px; /* Set a specific slider handle width */
    height: 15px; /* Slider handle height */
    background: #c7c7c7; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 50%;
  }
  ::-webkit-slider-thumb:hover {
    background-color: white;
  }
`
