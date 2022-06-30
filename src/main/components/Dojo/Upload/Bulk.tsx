import styled from "@emotion/styled"

import React, { FC, useRef } from "react"

import UploadFileIcon from "@mui/icons-material/UploadFile"
import { EmptyAlbum } from "../Album/Album"

const IconStyle = {
  margin: "5px",
}

const ImportButton = styled.button`
  font-family: ${({ theme }) => theme.fontFamily};
  display: flex;
  align-items: center;
  position: relative;
  font-size: 16px;
  padding-bottom: 5px;
  left: 5rem;
  :hover {
    color: ${({ theme }) => theme.headerColor};
  }
`

const BulkImport: FC<{ album: EmptyAlbum }> = ({ album }) => {
  const ref = useRef<HTMLInputElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ref.current?.click()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        console.log("file", file)
        const result = file ? album.addFromFile(file) : undefined
        console.log("Upload", result)
      }
    }
  }

  return (
    <div>
      <ImportButton onClick={handleClick}>
        Import
        <UploadFileIcon style={IconStyle} />
      </ImportButton>
      <input
        accept="audio/*"
        type="file"
        ref={ref}
        multiple={true}
        onChange={handleImport}
        style={{ display: "none" }}
      />
    </div>
  )
}

export default BulkImport
