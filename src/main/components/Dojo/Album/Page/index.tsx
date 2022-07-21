import CSS, { AlbumContent, TableHeader, TopBan } from "./CSS"

import styled from "@emotion/styled"
import { useWeb3React } from "@web3-react/core"
import { FC } from "react"
import { AlbumProps, Track } from "../../Album/Album"
import AlbumDetails from "./AlbumDetails"
import AlbumImage from "./AlbumImage"
import TrackItem from "./TrackItem"

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 75vh;
`

export const AlbumPage: FC<{ album: AlbumProps }> = ({ album }) => {
  const web3 = useWeb3React()
  const { account } = web3

  return (
    <Container key={"album-item-" + album.id}>
      <CSS />
      <AlbumContent>
        <TopBan>
          <AlbumImage album={album} />
          <AlbumDetails album={album} />
        </TopBan>

        <TableHeader></TableHeader>

        {album.songs.map((song: Track) => {
          return <TrackItem song={song} album={album} />
        })}
      </AlbumContent>
    </Container>
  )
}
