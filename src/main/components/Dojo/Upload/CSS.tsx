import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"

export default () => {
  return (
    <Global
      styles={css`
        .openLogo {
          height: 20px;
        }

        .uploadIcon {
          display: block;
        }
      `}
    />
  )
}

export const AlbumContent = styled.div`
  padding: 10px 40px;
  position: relative;
  overflow-y: scroll;
`

export const TopBan = styled.div`
  display: flex;
  gap: 30px;
`
export const Cover = styled.img`
  width: 200px;
  height: 200px;
`
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: rgb(205, 203, 203);
`

export const Title = styled.input`
  color: white;
  font-size: 40px;
  font-weight: bold;
  background: none;
`
export const Artist = styled.div`
  font-size: 20px;
  color: white;
`
export const PlayButton = styled.button`
  padding: 10px;
  background-color: #99badd;
  width: 120px;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 35px;
  border-radius: 25px;
  letter-spacing: 1.5px;
  transition: transform 0.1s;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`
export const OpenButton = styled.button`
  padding: 10px;
  background-color: transparent;
  width: 200px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 35px;
  margin-bottom: 35px;
  border: 2px solid white;
  border-radius: 25px;
  letter-spacing: 1.5px;
  transition: transform 0.2s;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`
export const TableHeader = styled.div`
  border-bottom: 1px solid rgb(67, 67, 67);
  display: flex;
  color: rgb(125, 125, 125);
  letter-spacing: 1.4px;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 8px;
`
export const NumberHeader = styled.span`
  width: 10%;
  transition: transform 0.2s;
  font-size: 20px;
  :hover {
    cursor: pointer;
    color: #99badd;
  }
`
export const AddButton = styled.div`
  width: 10%;
  transition: transform 0.2s;
  font-size: 20px;
  :hover {
    cursor: pointer;
    color: #99badd;
  }
`
export const RemoveButton = styled.div`
  width: 10%;
  transition: transform 0.2s;
  display: flex;
  font-size: 20px;
  :hover {
    cursor: pointer;
    color: red;
  }
`

export const TitleHeader = styled.div`
  width: 80%;
  padding-left: 5%;
  display: flex;
  justify-content: start;
  color: #99badd;
`
export const TrackInput = styled.input`
  width: 25%;
  padding-left: 5%;
  display: flex;
  justify-content: start;
  color: #99badd;
  background: none;
  overflow: hidden;
`

export const TableContent = styled.div`
  border-bottom: 1px solid rgb(67, 67, 67);
  display: grid;
  align-items: center;
  flex-wrap: wrap;
  color: rgb(125, 125, 125);
  padding-bottom: 13px;
  font-size: 16px;
  font-weight: 500;
  padding-top: 13px;
  overflow: scroll;
  height: 4rem;
`
