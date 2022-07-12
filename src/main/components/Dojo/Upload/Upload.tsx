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
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import { Modal } from "@mui/material"
import { Box } from "@mui/system"
import { useWeb3React } from "@web3-react/core"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { DEFAULT_ALBUM_COVER } from "../../../actions/fakeImage"
import Opensea from "../../../images/opensea.png"
import { createTrack, generateHash, IPFS_URL } from "../../../IPFS"
import { createDoc } from "../../../lib/firebase"
import { AlbumProps, Track } from "../Album/Album"
import Loading from "../Loading"
import { SearchBar } from "../SearchBar"
import AlbumDetails from "./AlbumDetails"
import AlbumImage from "./AlbumImage"
import DropImport from "./DropImport"
import TrackItem from "./TrackItem"
import UploadAll from "./UploadAll"

import YAHNDI from "../../../images/YAHNDI-modified.png"

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

  const handleMint = async (e: any) => {
    // album.resetImg()

    if (!album.id) {
      alert("save album first")
      return
    }
    console.log(album.id)
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading("Uploading...")
    if (account) {
      let details: AlbumProps = {
        artist: album.artist,
        title: album.title,
        value: album.value,
        year: album.year,
        cover: "",
        songs: [],
      }

      if (!user.info) {
        alert("No user found")
        setLoading(undefined)
        return
      }

      if (album.cover === DEFAULT_ALBUM_COVER) {
        // alert("Pick a cover photo first")
        // setLoading(undefined)
        // return
        album.cover = YAHNDI
      }

      const coverHash = await generateHash(album.cover)

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
            return await createTrack(song, details)
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
          album.id = res.id
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
          <OpenButton
            aria-disabled={album.songs.length == 0}
            onClick={handleSave}
          >
            Save
            <CloudUploadIcon style={{ margin: "0.5px" }} />
          </OpenButton>
          <OpenButton
            aria-disabled={album.songs.length == 0}
            onClick={handleMint}
          >
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
