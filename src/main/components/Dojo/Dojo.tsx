import styled from "@emotion/styled"
import { Breadcrumbs, Link } from "@mui/material"
import { useWeb3React } from "@web3-react/core"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useStores } from "../../hooks/useStores"
import dashboard from "../../images/dashboard.png"
import { createDoc, snapshot } from "../../lib/firebase"
import WalletInfo from "../Wallets/WalletInfo"
import TimePatrol from "./Audio/TimePatrol"
import {
  BackgroundImage,
  DojoCSS,
  InterfaceContainer,
  LogoDiv,
  SideBarContainer,
  SidePanel,
} from "./DojoCSS"
import { MainePane } from "./MainePane"

import { TrackPlayer } from "./TrackPlayer/TrackPlayer"

import rocklee from "../../images/rocklee.png"

const rockleee = rocklee
const lightning =
  "https://img.freepik.com/free-vector/sprite-sheet-with-lightnings-thunderbolt-strikes-set-fx-animation-realistic-set-purple-electric-impact-night-sparking-discharge-thunderstorm-isolated-transparent-background_107791-4362.jpg?t=st=1657604266~exp=1657604866~hmac=652878490a0b02ffa586cd6c89dfbabf282c83ddd2af5a5a390a1cc72c1e9cbe&w=1800"
const heartURL = "https://cssanimation.rocks/images/posts/steps/heart.png"
const bgUrl =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/edad14ff-2210-4b8a-9f18-6314e2df3de1/d1zarmq-e4724998-9eec-491f-8c1f-62ecc7056732.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VkYWQxNGZmLTIyMTAtNGI4YS05ZjE4LTYzMTRlMmRmM2RlMVwvZDF6YXJtcS1lNDcyNDk5OC05ZWVjLTQ5MWYtOGMxZi02MmVjYzcwNTY3MzIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.D6jgKHnMlN0O8Akxq0eXolTU3EBsUF5BF4NTFDN6DZ4"

const Heart = styled.div`
  width: 100px;
  height: 100px;
  background: url("${lightning}") no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(4);
  transition-duration: 0s;

  &[aria-active="true"] {
    transition-duration: 800ms;
    background-position: -100 0;
  }
`
const Stage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Dojo = observer(() => {
  const { router, user } = useStores()
  const { account } = useWeb3React()

  const [active, setActive] = useState(false)

  useEffect(() => {
    const setUser = async () => {
      if (!account) {
        return
      }

      let userDoc: QueryDocumentSnapshot<DocumentData> | undefined
      snapshot("Users", async (snap) => {
        userDoc = snap.docs.find((doc) => {
          return doc.data().address === account
        })

        if (userDoc === undefined) {
          console.warn("No user with specified wallet")
          await createDoc("Users", {
            address: account,
          }).then((result) => {
            user.info = {
              address: account,
              id: result.id,
            }
          })
        } else {
          user.info = {
            ...userDoc.data(),
            id: userDoc.id,
          }
        }
      })
      console.log("user", user.info)
    }
    setUser()
  }, [account])

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
                aria-current={router.path === "/track"}
                underline="hover"
                color="#99badd"
                onClick={(e) => (router.path = "/track")}
                href="/edit"
              >
                DOJO
              </Link>
              <Link
                aria-current={router.path === "sampler"}
                underline="none"
                color="grey"
                onClick={(e) => (router.path = "sampler")}
                href="#sampler"
              >
                Sampler
              </Link>
              <Link
                aria-current={router.path === "feed"}
                underline="none"
                color="grey"
                onClick={(e) => (router.path = "feed")}
                href="#feed"
              >
                Feed
              </Link>
              <Link
                aria-current={router.path === "wallets"}
                underline="hover"
                color="#99badd"
                onClick={(e) => (router.path = "wallets")}
                href="#wallets"
              >
                Wallets
              </Link>
            </Breadcrumbs>
          </LogoDiv>

          {/* <SideBar /> */}

          {/* <Stage>
            <Heart aria-active={active} onClick={(e) => setActive(!active)} />
          </Stage> */}

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

export default Dojo
