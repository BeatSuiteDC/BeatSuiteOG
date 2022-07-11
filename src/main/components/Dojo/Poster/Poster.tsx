import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import { useStores } from "../../../hooks/useStores"
import { AlbumProps } from "../Album/Album"
import {
  AlbumImg,
  Artist,
  BottomLayer,
  CardDiv,
  Container,
  IconDiv,
  PlayPauseIcon,
  Title,
  TitleContainer,
} from "./CSS"

import { PauseCircleOutline, PlayCircleOutline } from "@mui/icons-material"
import { useWeb3React } from "@web3-react/core"
import { DocumentData } from "firebase/firestore"
import { snapshot } from "../../../lib/firebase"

const importAlbum = (doc: DocumentData) => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
  }
}

const Poster: FC = () => {
  const { account, connector } = useWeb3React()

  const [albums, setAlbums] = useState<Array<any>>([])

  useEffect(() => {
    snapshot("Albums", (snap) => {
      setAlbums(snap.docs.map(importAlbum))
      console.log("albums", albums)
    })
  }, [])

  return (
    <Container>
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

  const inQueue = () => {
    return album.songs.every((s) => playlist.inQueue(s))
  }

  const handlePlay = (e: any) => {
    console.log("album-poster", album)
    playlist.reset()
    album.songs.forEach((song) => {
      if (!playlist.inQueue(song)) {
        playlist.addToQueue(song)
        console.log("song", song)
      }
    })
    streamer.play()
  }

  return (
    <>
      <CardDiv key={album.id} onClick={handlePlay}>
        <AlbumImg src={album.cover} />
        <BottomLayer>
          <IconDiv>
            <PlayPauseIcon>
              {streamer.isPlaying && inQueue() ? (
                <PauseCircleOutline style={{ margin: "0px 5px 0px 5px" }} />
              ) : (
                <PlayCircleOutline style={{ margin: "0px 0px 0px 5px" }} />
              )}
            </PlayPauseIcon>
            <TitleContainer>
              <Title>{album.title}</Title>
              <Artist>{album.artist}</Artist>
            </TitleContainer>
          </IconDiv>
        </BottomLayer>
      </CardDiv>
    </>
  )
})
