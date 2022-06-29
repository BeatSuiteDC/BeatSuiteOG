import { useStores } from "../../../hooks/useStores"
import CSS, {
  AlbumContent,
  Artist,
  Details,
  OpenButton,
  TableHeader,
  Title,
  TitleHeader,
  TopBan,
} from "./CSS"

import BulkImport from "./Bulk"

import AddCircleIcon from "@mui/icons-material/AddCircle"

import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Opensea from "../../../images/opensea.png"
import { Track } from "../Album/Album"
import AlbumImage from "./AlbumImage"
import TrackItem from "./TrackItem"

export default observer(() => {
  const rootStore = useStores()
  const { user, album, playlist } = rootStore

  useEffect(() => {
    const info = user.info
    if (info?.name) {
      album.artist = info.name
    }
  }, [])

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleMint = (e: any) => {}
  const handleSave = (e: any) => {}

  const handleArtist = (e: any) => {
    album.artist = e.target.value
  }
  const handleTitle = (e: any) => {
    album.title = e.target.value
  }

  return (
    <>
      <CSS />
      <AlbumContent>
        <TopBan>
          <AlbumImage />
          <Details>
            <div>ALBUM</div>
            <Title type="text" onChange={handleTitle} value={album.title} />
            <Artist type="text" onChange={handleArtist} value={album.artist} />
            {album.year} • {album.songs.length} tracks
          </Details>
        </TopBan>

        <TopBan>
          <OpenButton disabled={album.songs.length == 0} onClick={handleSave}>
            Upload
          </OpenButton>
          <OpenButton disabled={album.songs.length == 0} onClick={handleMint}>
            Mint
            <img src={Opensea} style={{ height: "20px" }} />
          </OpenButton>
        </TopBan>

        <TableHeader>
          <AddCircleIcon
            className="addIcon"
            onClick={(e) => album.addTrack()}
          />
          <TitleHeader>BANGERS</TitleHeader>
          <BulkImport />
        </TableHeader>

        {album.songs.map((song: Track, i) => {
          return <TrackItem song={song} key={i} />
        })}
      </AlbumContent>
    </>
  )
})
