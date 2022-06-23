import { motion } from "framer-motion"
import { FC, useCallback } from "react"
import { Link } from "react-router-dom"
import { useStores } from "../../../hooks/useStores"
import { Page } from "./SideBar"
import { ElementDiv } from "./SideBarCSS"

export type ElementProps = {
  key: number
  page: Page
  delay: number
}

const SideBarElement: FC<ElementProps> = ({ key, page, delay }) => {
  const { router } = useStores()

  return (
    <ElementDiv key={key}>
      <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: delay }}>
        <motion.div
          whileHover={{ scale: 1.09 }}
          whileTap={{ scale: 0.9 }}
          onClick={useCallback(() => (router.path = page.path), [])}
          className="station"
        >
          <Link to={`#${page.path}`} state={page}>
            {page.icon && <i>{page.icon}</i>}
            <span>{page.title}</span>
          </Link>
        </motion.div>
      </motion.div>
    </ElementDiv>
  )
}

export default SideBarElement
