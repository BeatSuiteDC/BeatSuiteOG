import { Breadcrumbs, Link } from "@mui/material"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { useStores } from "../../hooks/useStores"
import dashboard from "../../images/dashboard.png"
import { RoutePath } from "../../stores/Router"
import WalletInfo from "../WalletInfo"
import TimePatrol from "./Audio/TimePatrol"
import {
  BackgroundImage,
  DojoCSS,
  InterfaceContainer,
  LogoDiv,
  SideBarContainer,
  SidePanel,
} from "./DojoCSS"
import Loading from "./Loading"
import { MainePane } from "./MainePane"

import { TrackPlayer } from "./TrackPlayer/TrackPlayer"
import { PTag } from "./TrackPlayer/TrackPlayerCSS"
// import Socials from "./Socials"

const Routes: FC<React.PropsWithChildren<unknown>> = observer(() => {
  const {
    router: { path },
    services: {
      streamer: { isPlaying },
    },
  } = useStores()

  console.log({ isPlaying, path })
  return (
    <>
      {/* <PathContainer>{path === "/home" && <Featured />}</PathContainer> */}
      {/* {path === "/app" && <Hero />} */}
      {/* {path === "/home" && <PianoRollEditor />} */}
      {/* {path === "/tempo" && <TempoEditor />} */}
      {!isPlaying && <Loading />}
    </>
  )
})

const Dojo = observer(() => {
  const { router } = useStores()

  return (
    <>
      <DojoCSS />
      <BackgroundImage src={dashboard} />
      <InterfaceContainer>
        <SideBarContainer>
          <LogoDiv onClick={(e) => router.path === "upload"}>
            | BeatSuite |
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                aria-current={router.path === "upload"}
                underline="hover"
                color="#99badd"
                onClick={(e) => (router.path = "upload")}
                href="#upload"
              >
                Upload
              </Link>
              <Link
                aria-current={router.path === "bangers"}
                underline="hover"
                color="#99badd"
                onClick={(e) => (router.path = "bangers")}
                href="#bangers"
              >
                Bangers
              </Link>
              <Link
                aria-current={router.path === "sampler"}
                underline="hover"
                color="#99badd"
                onClick={(e) => (router.path = "sampler")}
                href="#sampler"
              >
                Sampler
              </Link>
              <Link
                aria-current={router.path === "feed"}
                underline="hover"
                color="#99badd"
                onClick={(e) => (router.path = "feed")}
                href="#feed"
              >
                Feed
              </Link>
            </Breadcrumbs>
          </LogoDiv>

          {/* <SideBar /> */}

          <TrackPlayer />
        </SideBarContainer>

        <MainePane />

        <SidePanel>
          <WalletInfo />
          <TimePatrol />
        </SidePanel>
      </InterfaceContainer>
    </>
  )
})

const PathBreadCrumb: FC<React.PropsWithChildren<{ path: RoutePath }>> = ({
  path: RoutePath,
}) => {
  return (
    <>
      <Breadcrumbs>
        <PTag>Feed</PTag>
        <PTag>Bangers</PTag>
        <PTag>Home</PTag>
      </Breadcrumbs>
    </>
  )
}

export default Dojo
