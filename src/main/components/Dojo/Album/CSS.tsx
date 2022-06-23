import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"

const AlbumCSS = () => {
  return (
    <Global
      styles={css`
        .openLogo {
          height: 20px;
        }
      `}
    />
  )
}

export default AlbumCSS

export const AlbumContent = styled.div`
  padding: 10px 40px;
`

export const TopBan = styled.div`
  display: flex;
  gap: 30px;
`
export const Cover = styled.img`
  width: 200px;
`
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: rgb(205, 203, 203);
`

export const Title = styled.p`
  color: white;
  font-size: 40px;
  font-weight: bold;
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
export const OpenButton = styled.div`
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
  transition: transform 0.4s;
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
export const NumberHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
`
export const TitleHeader = styled.div`
  width: 80%;
  padding-left: 5%;
  display: flex;
  justify-content: start;
  color: #99badd;
`
export const TableContent = styled.div`
  border-bottom: 1px solid rgb(67, 67, 67);
  display: flex;
  color: rgb(125, 125, 125);
  padding-bottom: 13px;
  font-size: 16px;
  font-weight: 500;
  padding-top: 13px;
`
