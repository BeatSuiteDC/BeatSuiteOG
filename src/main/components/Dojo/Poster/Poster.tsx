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
import { snapshot } from "../../../lib/firebase"

export type PosterProps = {
  album: AlbumProps
  key: number
}

// const albums: Array<AlbumProps> = [demoAlbum]

const Poster: FC = () => {
  const { account, connector } = useWeb3React()
  if (!account) {
    // connector.activate()
  }

  const [albums, setAlbums] = useState<Array<any>>([])

  useEffect(() => {
    snapshot("Albums", (snap) => {
      // console.log("snap", snap.docs)
      setAlbums(snap.docs.map((doc) => doc.data()))
      // console.log("albums", albums)
    })
  }, [])

  return (
    <Container>
      {/* <PosterCSS /> */}
      {albums.map((album, index) => {
        return (
          <>
            <PosterCard album={album} key={index} />
          </>
        )
      })}
    </Container>
  )
}
export default Poster

const PosterCard: FC<{ album: AlbumProps; key: number }> = observer(
  ({ album, key }) => {
    const {
      services: { streamer },
      playlist,
    } = useStores()

    const handlePlay = (e: any) => {
      const queue = playlist.queue
      console.log({ queue })
    }

    return (
      <CardDiv key={key} onClick={handlePlay}>
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
  }
)
