import { observer } from "mobx-react-lite"
import { RoutePath } from "../../../stores/Router"
import SideBarElement from "./Element"
import { Container, List } from "./SideBarCSS"

// import ExploreIcon from "@mui/icons-material/Explore"
// import HeadsetIcon from "@mui/icons-material/Headset"

export type Page = {
  title?: string
  path: RoutePath
  icon?: any
}

export const SideBarElements: Array<Page> = [
  {
    title: "Bangers",
    path: "bangers",
  },
  {
    title: "Dojo",
    path: "dojo",
  },
  {
    title: "Upload",
    path: "upload",
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
