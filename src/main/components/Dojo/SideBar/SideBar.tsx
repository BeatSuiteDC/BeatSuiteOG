import { motion } from "framer-motion"
import { useCallback } from "react"
import { Link } from "react-router-dom"
import { useStores } from "../../../hooks/useStores"
import { RoutePath } from "../../../stores/Router"
import { Container, Element, List } from "./SideBarCSS"

type Page = {
  title?: string
  path: RoutePath
  icon?: any
}

const SideBarElements: Array<Page> = [
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

export const SideBar = () => {
  const { router } = useStores()

  return (
    <Container>
      <List>
        {SideBarElements.map((page, i, a) => {
          const delay = (i / a.length) * 1.1
          return (
            <div key={i}>
              <Element>
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ delay: delay }}
                >
                  <motion.div
                    whileHover={{ scale: 1.09 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={useCallback(() => (router.path = page.path), [])}
                    className="station"
                  >
                    <Link to={`#${page.path}`}>
                      {page.icon && <i>{page.icon}</i>}
                      <span>{page.title}</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </Element>
            </div>
          )
        })}
      </List>
    </Container>
  )
}

export default SideBar
