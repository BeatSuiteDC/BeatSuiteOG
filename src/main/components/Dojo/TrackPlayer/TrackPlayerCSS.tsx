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
      `}
    />
  )
}

export const Container = styled.div`
  padding-top: 20px;
`
export const Top = styled.div`
  display: flex;
  align-items: center;
`
export const TopImg = styled.img`
  width: 50px !important;
`
export const PTag = styled.p`
  margin-left: 10px;
  color: #f1f1f1;
  font-size: 14px;
  overflow-x: scroll;
`
export const Artist = styled.span`
  display: block;
  font-size; 12px;
  color: #848484;
`

export const Bottom = styled.div`
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
  margin-top: 10px;
  height: 2px;
  width: 100px;
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
