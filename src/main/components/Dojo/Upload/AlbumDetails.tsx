import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import ethLogo from "../../../images/ethereum-logo.png"
import { EmptyAlbum } from "../Album/Album"

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
const Value = styled.input`
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

const AlbumDetails: FC<{ album: EmptyAlbum }> = observer(({ album }) => {
  const handleArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
    album.artist = e.target.value
  }
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    album.title = e.target.value
  }
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)
    if (isNaN(value)) {
      return
    }

    album.value = value == 0 ? "0.0" : String(value)
  }
  return (
    <Container>
      <div>ALBUM</div>
      <Title type="text" onChange={handleTitle} value={album.title} />
      <Artist type="text" onChange={handleArtist} value={album.artist} />
      {album.year} • {album.songs.length} tracks
      <div style={{ display: "flex", alignItems: "center" }}>
        <EthLogo src={ethLogo} />
        <Value type="text" onChange={handleValue} value={album.value} />
      </div>
    </Container>
  )
})

export default AlbumDetails
