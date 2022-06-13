import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { useCallback } from "react"
import { useStores } from "../../../hooks/useStores"
// import triangle from "../../../images/playBtn.png"
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
  {
    title: "Albums",
    path: "/albums",
  },
  {
    title: "Uploads",
    path: "/uploads",
  },
]

export const SideBar = () => {
  const { router } = useStores()

  const Container = styled.div`
    border-color: blue;
    width: 99%;
    height: 70%;
    box-shadow: 1px 0px 0 white;
    text-align: center;
    display: flex;
    justify-content: end;
    z-index: 1;
  `

  const List = styled.div`
    min-width: 75%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 3px;
  `

  const Element = styled.div`
    font-size: 36px;
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    color: #c0c0c0;
    text-transform: uppercase;
    margin-top: 20px;
    text-shadow: 1px 1px rgb(0 0 0 / 70%);
    cursor: pointer;
    align-text: center;
  `

  const Triangle = styled.div`
    width: 12px;
    height: 14px;
    padding-right: 1px;
    filter: invert(82%) sepia(0%) saturate(0%) hue-rotate(222deg)
      brightness(97%) contrast(86%);
    cursor: pointer;
  `

  return (
    <Container>
      <List>
        {SideBarElements.map((page, i, a) => {
          const delay = (i / a.length) * 1.15
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
                    {/* <Triangle><img src={triangle} alt="" /></Triangle> */}
                    <>{page.title}</>
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
