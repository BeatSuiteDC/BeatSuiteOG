import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import Banner from "../Banner/Banner"
import { Container, MainCSS, TabList } from "./MainCSS"

import { Tabs } from "antd"

const { TabPane } = Tabs

type BannerTab = {
  title: string
}

const Tab: FC<BannerTab> = ({ title }) => {
  const href = title.toLowerCase()
  return (
    <li>
      <a href={`#${href}`}>{title}</a>
    </li>
  )
}

const MainContainer: FC<React.PropsWithChildren<unknown>> = observer(() => {
  return (
    <>
      <MainCSS />
      <Container>
        <Banner />
        <TabList>
          <Tab title="Albums" />
          <Tab title="Snippets" />
          <Tab title="About" />
          <Tab title="Mojo" />
        </TabList>
      </Container>
    </>
  )
})

export default MainContainer
