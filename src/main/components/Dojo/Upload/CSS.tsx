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
          #disabled:hover {
            cursor: pointer;
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
          left: 2rem;
          :hover {
            color: #99badd;
          }

        }
        .playIcon {
          margin: 5px;
          position: relative;
          font-size: 20px;
          left: 2rem;
          color: ${theme.tertiaryTextColor};
          :hover {
            color: #99badd;
          }

        
      `}
    />
  )
}

export const AlbumContent = styled.div`
  padding: 10px 40px;
  position: relative;
  overflow-y: scroll;
  font-weight: 800px;
  height: 37rem;
`

export const TopBan = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`

export const OpenButton = styled.button`
  padding: 5px;
  background-color: transparent;
  width: 200px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
  border: 2px solid white;
  border-radius: 25px;
  letter-spacing: 1.5px;
  transition: transform 0.2s;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  &[aria-disabled="true"] {
    background-color: transparent;
    color: grey;
  }
`
export const TableHeader = styled.div`
  border-bottom: 1px solid rgb(67, 67, 67);
  display: flex;
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
