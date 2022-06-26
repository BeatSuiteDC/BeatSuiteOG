import { observer } from "mobx-react-lite"
import { FC } from "react"
import { AlbumProps, demoAlbum } from "../Album/Album"
import { AlbumImg, CardDiv, Container } from "./CSS"

export type PosterProps = {
  album: AlbumProps
  key: number
}

const albums: Array<AlbumProps> = [demoAlbum]

const Poster: FC = () => {
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

const PosterCard: FC<PosterProps> = observer(({ album, key }) => {
  const handlePlay = (e: any) => {}

  return (
    <CardDiv key={key} onClick={handlePlay}>
      <AlbumImg src={album.cover} />
    </CardDiv>
  )
})
