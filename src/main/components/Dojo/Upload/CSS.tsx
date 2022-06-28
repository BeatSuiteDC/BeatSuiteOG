import { css, Global, useTheme } from "@emotion/react"
import styled from "@emotion/styled"

export default () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        .openLogo {
          height: 20px;
        }

        .albumContainer {
          width: 200px;
          height: 200px;
          cursor: pointer;
          border-radius: 20px;
          :hover > #cover {
            scale: 1.05;
            opacity: 0.5;
            border: 15px solid ${theme.secondaryTextColor};
          }
          :hover > #icon {
            opacity: 1;
          }
        }

        .albumUploadIcon {
          position: absolute;
          margin: 0px;
          inset: 110px 130px;
          opacity: 0;
          transition: 400ms ease;
          font-size: 30px;
        }

        .addIcon {
          margin: 5px;
          margin-left: 10px;
          transition: transform 0.2s;
          font-size: 20px;
          :hover {
            cursor: pointer;
            color: ${theme.headerColor};
          }
        }

        .removeIcon {
          margin: 5px;
          margin-left: 10px;
          font-size: 20px;

          :hover {
            color: red;
          }
        }

        .uploadIcon {
          margin: 5px;
          position: relative;
          font-size: 20px;
          left: 42%;
          :hover {
            color: #99badd;
          }
        }
      `}
    />
  )
}

export const AlbumContent = styled.div`
  padding: 10px 40px;
  position: absolute;
  overflow-y: scroll;
  font-weight: 800px;
  height: 40rem;
`

export const TopBan = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`
export const Cover = styled.img`
  width: 200px;
  height: 200px;
  transition: 100ms ease;
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
  background: transparent;
  :hover {
    opacity: 0.5;
  }
`
export const Artist = styled.input`
  font-size: 20px;
  color: white;
  background: transparent;
  :hover {
    opacity: 0.5;
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
  background: orange;
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
  background: yellow;
  :hover {
    cursor: pointer;
    color: red;
  }
`

export const TitleHeader = styled.div`
  padding-left: 4.5rem;
  display: flex;
  color: ${({ theme }) => theme.headerColor};
  padding-top: 5px;
`
export const TrackInput = styled.input`
  color: #99badd;
  background: none;
  margin-left: 4rem;
  border-radius: 5px;
  padding-left: 10px;
  overflow-x: scroll;
  :hover {
    opacity: 0.5;
  }
`

export const TableContent = styled.div`
  border-bottom: 1px solid rgb(67, 67, 67);
  height: 3rem;
  display: flex;
  align-items: center;
  overflow: auto;
`