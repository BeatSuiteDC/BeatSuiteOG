import styled from "@emotion/styled"

import React, { FC } from "react"

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import Playlist from "../../../../common/playlist/Playlist"
import { EmptyAlbum } from "../Album/Album"

const IconStyle = {
  margin: "5px",
}

const UploadButton = styled.button`
  font-family: ${({ theme }) => theme.fontFamily};
  display: flex;
  margin-left: 2rem;
  align-items: center;
  position: relative;
  font-size: 16px;
  padding-bottom: 5px;
  left: 5rem;
  :hover {
    color: ${({ theme }) => theme.headerColor};
  }
`

const UploadAll: FC<{
  album: EmptyAlbum

  playlist: Playlist
}> = ({ album, playlist }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    album.songs.forEach((song) => {
      playlist.addToQueue(song)
    })
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <div>
      <UploadButton onClick={handleClick}>
        Queue
        <PlaylistAddIcon style={IconStyle} />
      </UploadButton>
    </div>
  )
}

export default UploadAll
