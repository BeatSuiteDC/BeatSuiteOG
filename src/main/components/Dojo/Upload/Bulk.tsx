import { Input, Popover } from "@mui/material"
import React from "react"
import { ImportButton } from "./CSS"

export default () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleImport = (e: React.ChangeEvent) => {}

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <div>
      <ImportButton aria-describedby={id} onClick={handleClick}>
        Import
      </ImportButton>
      <Input onChange={handleImport} style={{ display: "none" }} type="file" />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        From Local
      </Popover>
    </div>
  )
}
