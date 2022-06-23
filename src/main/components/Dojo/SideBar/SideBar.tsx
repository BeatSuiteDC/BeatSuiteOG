import { observer } from "mobx-react-lite"
import { RoutePath } from "../../../stores/Router"
import SideBarElement from "./Element"
import { Container, List } from "./SideBarCSS"

export type Page = {
  title?: string
  path: RoutePath
  icon?: any
}

export const SideBarElements: Array<Page> = [
  {
    title: "Streamer",
    path: "albums",
  },
  {
    title: "Dojo",
    path: "home",
  },
  {
    title: "Uploads",
    path: "uploads",
  },
  {
    title: "Feed",
    path: "feed",
  },
]

const SideBar = observer(() => {
  return (
    <Container>
      <List>
        {SideBarElements.map((page, i, a) => {
          const delay = (i / a.length) * 1.15
          return <SideBarElement key={i} delay={delay} page={page} />
        })}
      </List>
    </Container>
  )
})

export default SideBar
