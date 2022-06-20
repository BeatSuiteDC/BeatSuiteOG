import { Input } from "@mui/material"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Container } from "./CSS"

const SearchBar: FC<React.PropsWithChildren<unknown>> = observer(() => {
  const [search, setSearch] = useState("")
  return (
    <Container>
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Container>
  )
})
export default SearchBar
