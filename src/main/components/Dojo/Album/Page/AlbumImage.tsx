import styled from "@emotion/styled"
import { FC } from "react"
import { AlbumProps } from "../../Album/Album"

const Container = styled.div`
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 20px;
  :hover > #cover {
    scale: 1.05;
    opacity: 0.5;
    border: 15px solid ${({ theme }) => theme.secondaryTextColor};
  }
`
const Cover = styled.img`
  width: 200px;
  height: 200px;
  transition: 100ms ease;
`
const AlbumImage: FC<{ album: AlbumProps }> = ({ album }) => {
  return (
    <Container>
      <Cover id="cover" src={album.cover} alt="albumCover" />
    </Container>
  )
}

export default AlbumImage
