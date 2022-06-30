import styled from "@emotion/styled"
import { useStores } from "../../../hooks/useStores"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: rgb(205, 203, 203);
`
const Title = styled.input`
  color: white;
  font-size: 40px;
  font-weight: bold;
  background: transparent;
  :hover {
    opacity: 0.5;
  }
`
const Artist = styled.input`
  font-size: 20px;
  color: white;
  background: transparent;
  :hover {
    opacity: 0.5;
  }
`

const AlbumDetails = () => {
  const { album } = useStores()

  const handleArtist = (e: any) => {
    album.artist = e.target.value
  }
  const handleTitle = (e: any) => {
    album.title = e.target.value
  }
  return (
    <Container>
      <div>ALBUM</div>
      <Title type="text" onChange={handleTitle} value={album.title} />
      <Artist type="text" onChange={handleArtist} value={album.artist} />
      {album.year} • {album.songs.length} tracks
    </Container>
  )
}

export default AlbumDetails
