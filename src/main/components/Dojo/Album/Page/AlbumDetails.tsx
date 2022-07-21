import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import ethLogo from "../../../../images/ethereum-logo.png"
import { AlbumProps } from "../../Album/Album"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: rgb(205, 203, 203);
`
const Title = styled.span`
  color: white;
  font-size: 40px;
  font-weight: bold;
  background: transparent;
  :hover {
    opacity: 0.5;
  }
`
const Artist = styled.span`
  font-size: 20px;
  color: white;
  background: transparent;
  :hover {
    opacity: 0.5;
  }
`
const Value = styled.span`
  font-size: 20px;
  color: white;
  width: 5rem;
  background: transparent;
  :hover {
    opacity: 0.5;
  }
`

const EthLogo = styled.img`
  position: relative;
  width: 25px;
  height: 25px;
  margin-right: 5px;
`

const AlbumDetails: FC<{ album: AlbumProps }> = observer(({ album }) => {
  return (
    <Container>
      <div>COLLECTION</div>
      <Title>{album.title}</Title>
      <Artist>{album.artist}</Artist>
      {album.year} • {album.songs.length} tracks
      <div style={{ display: "flex", alignItems: "center" }}>
        <EthLogo src={ethLogo} />
        <Value>{album.value}</Value>
      </div>
    </Container>
  )
})

export default AlbumDetails
