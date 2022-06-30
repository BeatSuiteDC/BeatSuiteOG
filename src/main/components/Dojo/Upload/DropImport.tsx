import { useTheme } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { Skeleton } from "@mui/material"
import React, { FC, useEffect, useState } from "react"
import { EmptyAlbum } from "../Album/Album"

const TracksContainer = styled("div")`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  [aria-disabled="true"] {
    :hover {
      transform: scale(1.05);
    }
  }
`

const DropImport: FC<React.PropsWithChildren<{ album: EmptyAlbum }>> = ({
  album,
  children,
}) => {
  const theme = useTheme()
  const [dragging, setDragging] = useState(false)
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    setEmpty(album.songs.length == 0)
  }, [album])

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
    e.dataTransfer.dropEffect = "move"
  }
  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const files = e.dataTransfer.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        if (file?.type.includes("audio")) {
          album.addFromFile(file)
        }
      }
    }
  }

  return (
    <TracksContainer
      draggable={true}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {album.songs.length == 0 ? (
        <>
          <Skeleton
            style={{ height: "100%", background: "none" }}
            variant="rectangular"
            animation="wave"
          />
          <p
            style={{
              fontSize: 20,
              position: "absolute",
              top: "80%",
              left: "40%",
              color: "grey",
            }}
          >
            {!dragging && "Drop or import"}
          </p>
        </>
      ) : (
        children
      )}
    </TracksContainer>
  )
}

export default DropImport
