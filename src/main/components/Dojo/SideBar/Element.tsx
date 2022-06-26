import { FC, useCallback } from "react"
import { useStores } from "../../../hooks/useStores"
import { Page } from "./SideBar"
import { ElementDiv, PageIcon } from "./SideBarCSS"

export type ElementProps = {
  key: number
  page: Page
  delay: number
}

const SideBarElement: FC<ElementProps> = ({ key, page, delay }) => {
  const { router } = useStores()

  return (
    <ElementDiv key={key}>
      <PageIcon onClick={useCallback(() => (router.path = page.path), [])}>
        {page.icon && <page.icon />}
        <span>{page.title}</span>
      </PageIcon>
    </ElementDiv>
  )
}

export default SideBarElement
