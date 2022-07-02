import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HomeIcon from "@mui/icons-material/Home"
import { Breadcrumbs } from "@mui/material"
import Chip from "@mui/material/Chip"
import { styled } from "@mui/material/styles"
import { observer } from "mobx-react-lite"
import React from "react"

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {},
    "&:active": {
      boxShadow: theme.shadows[1],
    },
  }
}) as typeof Chip // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default observer(() => {
  function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault()
    console.info("You clicked a breadcrumb.")
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Catalog" />
        <StyledBreadcrumb
          label="Accessories"
          deleteIcon={<ExpandMoreIcon />}
          onDelete={handleClick}
        />
      </Breadcrumbs>
    </>
  )
})
