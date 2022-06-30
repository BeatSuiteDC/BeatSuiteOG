import { useStores } from "../../../hooks/useStores"
import CSS, {
  AlbumContent,
  OpenButton,
  TableHeader,
  TitleHeader,
  TopBan,
} from "./CSS"

import BulkImport from "./Bulk"

import AddCircleIcon from "@mui/icons-material/AddCircle"

import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Opensea from "../../../images/opensea.png"
import { Track } from "../Album/Album"
import AlbumDetails from "./AlbumDetails"
import AlbumImage from "./AlbumImage"
import TrackItem from "./TrackItem"

export default observer(() => {
  const rootStore = useStores()
  const { user, album } = rootStore

  useEffect(() => {
    const info = user.info
    if (info?.name) {
      album.artist = info.name
    }
  }, [])

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleMint = (e: any) => {}
  const handleSave = (e: any) => {}

  return (
    <>
      <CSS />
      <AlbumContent>
        <TopBan>
          <AlbumImage />
          <AlbumDetails />
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
            onClick={(e) => album.createTrack()}
          />
          <TitleHeader>BANGERS</TitleHeader>
          <BulkImport album={album} />
        </TableHeader>

        {album.songs.map((song: Track, i) => {
          return <TrackItem song={song} key={i} />
        })}
      </AlbumContent>
    </>
  )
})
