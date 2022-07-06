import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import { useStores } from "../../../hooks/useStores"
import { AlbumProps } from "../Album/Album"
import {
  AlbumImg,
  CardDiv,
  Container,
  IconDiv,
  PlayPauseIcon,
  Title,
} from "./CSS"

import { Pause, PlayArrow } from "@mui/icons-material"
import { useWeb3React } from "@web3-react/core"
import { DocumentData } from "firebase/firestore"
import { snapshot } from "../../../lib/firebase"

// const albums: Array<AlbumProps> = [demoAlbum]

const importAlbum = (doc: DocumentData) => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
  }
}

const Poster: FC = () => {
  const { account, connector } = useWeb3React()
  if (!account) {
    connector.activate()
  }

  const [albums, setAlbums] = useState<Array<any>>([])

  useEffect(() => {
    snapshot("Albums", (snap) => {
      setAlbums(snap.docs.map(importAlbum))
      console.log("albums", albums)
    })
  }, [])

  return (
    <Container>
      {/* <PosterCSS /> */}
      {albums.map((album) => {
        return (
          <>
            <PosterCard album={album} />
          </>
        )
      })}
    </Container>
  )
}
export default Poster

const PosterCard: FC<{ album: AlbumProps }> = observer(({ album }) => {
  const {
    services: { streamer },
    playlist,
  } = useStores()

  const handlePlay = (e: any) => {
    console.log("album-poster", album)
    album.songs.forEach((song) => {
      if (!playlist.inQueue(song)) {
        playlist.addToQueue(song)
        console.log("song", song)
      }
    })
    streamer.play()
  }

  return (
    <CardDiv key={album.id} onClick={handlePlay}>
      <AlbumImg src={album.cover} />
      <IconDiv>
        <PlayPauseIcon>
          {/* album.songs.includes(playlist.active) && */}
          {streamer.isPlaying ? (
            <Pause style={{ marginTop: "1px" }} />
          ) : (
            <PlayArrow style={{ marginTop: "1px" }} />
          )}
        </PlayPauseIcon>
      </IconDiv>
      <div style={{ fontSize: "15px" }}>
        <Title>{album.title}</Title>
        <h6>{album.artist}</h6>
      </div>
    </CardDiv>
  )
})
