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

import { Modal } from "@mui/material"
import { Box } from "@mui/system"
import { useWeb3React } from "@web3-react/core"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Opensea from "../../../images/opensea.png"
import ipfs from "../../../IPFS"
import { createDoc } from "../../../lib/firebase"
import { AlbumProps, DEFAULT_ALBUM_COVER, Track } from "../Album/Album"
import Loading from "../Loading"
import { SearchBar } from "../SearchBar"
import AlbumDetails from "./AlbumDetails"
import AlbumImage from "./AlbumImage"
import DropImport from "./DropImport"
import TrackItem from "./TrackItem"
import UploadAll from "./UploadAll"

const IPFS_URL = "https://beatsuite.infura-ipfs.io/ipfs/"

export default observer(() => {
  const rootStore = useStores()
  const { user, album, playlist } = rootStore
  const [loading, setLoading] = useState<string | undefined>()
  const { account } = useWeb3React()

  useEffect(() => {
    const info = user.info
    if (info?.name) {
      album.artist = info.name
    }
  }, [])

  const handleMint = async (e: any) => {}

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading("Uploading...")
    if (account) {
      let details: AlbumProps = {
        artist: album.artist,
        title: album.title,
        year: Number(album.year),
        cover: "",
        songs: [],
      }

      if (!user.info) {
        alert("No user found")
        setLoading(undefined)
        return
      }

      if (album.cover === DEFAULT_ALBUM_COVER) {
        alert("Pick a cover photo first")
        setLoading(undefined)
        return
      }
      const response = await fetch(album.cover)
      let arrayBuffer = await response.arrayBuffer()
      const coverHash = await ipfs(arrayBuffer)

      if (!coverHash) {
        alert("Invalid cover image")
        setLoading(undefined)
        return
      }

      details.cover = IPFS_URL + coverHash
      console.log({ coverHash }, details.cover)

      Promise.all(
        album.songs.map(async (song) => {
          if (song.src) {
            setLoading(`Hashing...`)
            const songRes = await fetch(song.src)
            const songBuff = await songRes.arrayBuffer()
            const songHash = await ipfs(songBuff)
            const src = IPFS_URL + songHash
            console.log({ src })
            const track: Track = {
              duration: song.duration,
              cover: details.cover,
              album: album.title,
              title: song.title,
              sample: song.sample,
              id: song.id,
              src,
            }
            return track
          }
        })
      ).then((tracks) => {
        setLoading("Storing to Db...")
        createDoc("Albums", {
          ...details,
          creator: account,
          songs: [...tracks],
        }).then((res) => {
          console.log("Album id:", res.id)
          setLoading(undefined)
        })
      })
    } else {
      alert("connect wallet first")
      setLoading(undefined)
    }
  }

  return (
    <>
      <CSS />
      <AlbumContent>
        <TopBan>
          <AlbumImage album={album} />
          <AlbumDetails album={album} />
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
          <UploadAll album={album} playlist={playlist} />

          <SearchBar />
        </TableHeader>

        {loading && (
          <Modal sx={style} open={loading ? true : false}>
            <Box>
              <Loading title={loading} />
            </Box>
          </Modal>
        )}

        <DropImport album={album}>
          {album.songs.map((song: Track) => {
            return (
              <div key={"track-item-" + song.id}>
                <TrackItem song={song} playlist={playlist} album={album} />
              </div>
            )
          })}
        </DropImport>
      </AlbumContent>
    </>
  )
})

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}
