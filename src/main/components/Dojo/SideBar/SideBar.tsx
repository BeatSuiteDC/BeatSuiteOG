import { motion } from "framer-motion"
import { useCallback } from "react"
import { useStores } from "../../../hooks/useStores"
import { RoutePath } from "../../../stores/Router"
type Page = {
  title: string
  path: RoutePath
  logo?: any
}

const SideBarElements: Array<Page> = [
  {
    title: "Dojo",
    path: "/home",
  },
]

export const SideBar = () => {
  const { router } = useStores()

  return (
    <div className="radioStationsContainer">
      <div className="radioList">
        {SideBarElements.map((page, i, a) => {
          const delay = (i / a.length) * 1.15
          return (
            <div>
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
                  {/* <img className="triangle" src={triangle} alt="" /> */}
                  {page.title}
                </motion.div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
