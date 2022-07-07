import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove"
import { ListItemButton, ListItemIcon } from "@mui/material"
import { FC } from "react"
import Playlist from "../../../../common/playlist/Playlist"
import { Track } from "../Album/Album"

const PlaylistPopper: FC<{
  active: boolean
  track: Track
  playlist: Playlist
  idx: number
}> = ({ active, track, playlist, idx }) => {
  const handleQueue = (e: React.MouseEvent, track: Track) => {
    const idx = playlist.index(track)
    playlist.skipTo(idx)
  }

  return (
    <>
      <ListItemButton
        className="playlistItem"
        key={"playlist-item-btn-" + idx * Math.random()}
        selected={active}
      >
        <ListItemIcon>
          <PlaylistRemoveIcon
            key={"playlist-item-icon-" + idx}
            className="playlistIcon"
            onClick={(e) => playlist.remove(track)}
          />
        </ListItemIcon>
        <span onClick={(e) => handleQueue(e, track)} className="_trackTitle">
          {track.title}
        </span>
      </ListItemButton>
    </>
  )
}

export default PlaylistPopper
