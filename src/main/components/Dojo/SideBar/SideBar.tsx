import { Tabs } from "@mui/material"
import { RoutePath } from "../../../stores/Router"
import SideBarElement from "./Element"
import { Container } from "./SideBarCSS"

export type Page = {
  title?: string
  path: RoutePath
  icon?: any
}

export const SideBarElements: Array<Page> = [
  {
    title: "Dojo",
    path: "home",
  },
  {
    title: "Feed",
    path: "feed",
  },
  {
    title: "Albums",
    path: "albums",
  },
  {
    title: "Uploads",
    path: "uploads",
  },
]

const SideBar = () => {
  return (
    <Container>
      <Tabs orientation="vertical">
        {/* <List> */}
        {SideBarElements.map((page, i, a) => {
          const delay = (i / a.length) * 1.15
          return <SideBarElement key={i} delay={delay} page={page} />
        })}
        {/* </List> */}
      </Tabs>
    </Container>
  )
}

export default SideBar
