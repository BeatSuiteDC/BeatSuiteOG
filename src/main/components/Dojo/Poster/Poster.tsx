import { FC, useEffect, useRef, useState } from "react"
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

import { Modal, SxProps, Theme } from "@mui/material"
import { AlbumPage } from "../Album/Page"

const importAlbum = (doc: DocumentData) => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
  }
}

const Poster: FC = () => {
  const { account, connector } = useWeb3React()
  const [page, setPage] = useState<AlbumProps | undefined>()
  const [albums, setAlbums] = useState<AlbumProps[]>([])

  const divRef = useRef<HTMLDivElement>(null)

  const [unmount, setUnmount] = useState<null | HTMLDivElement>(null)

  useEffect(() => {
    snapshot("Albums", (snap) => {
      setAlbums(snap.docs.map(importAlbum))
    })
  }, [])

  return (
    <div>
      {page && (
        <Modal
          sx={popStyle}
          open={Boolean(page)}
          onClose={() => setPage(undefined)}
        >
          <AlbumPage album={page} />
        </Modal>
      )}
      <Container ref={divRef}>
        {albums.map((album) => {
          return (
            <>
              <PosterCard album={album} setPage={setPage} />
            </>
          )
        })}
      </Container>
    </div>
  )
}
export default Poster

const PosterCard: FC<{
  album: AlbumProps
  setPage: React.Dispatch<React.SetStateAction<AlbumProps | undefined>>
}> = ({ album, setPage }) => {
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
      }
    })
    streamer.play()
  }

  const handlePage = (e: any) => {
    setPage(album)
  }

  return (
    <>
      <CardDiv key={album.id} onClick={handlePage}>
        <AlbumImg src={album.cover} />
        <BottomLayer>
          <IconDiv>
            <PlayPauseIcon onClick={handlePlay}>
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
}

const popStyle: SxProps<Theme> = {
  left: "5vw",
  background: "#676767",
  borderRadius: "25px",
  border: "4mm ridge cyan",
  position: "absolute ",
  top: "5vh",
  width: "50vw",
  height: "50vw",
}
