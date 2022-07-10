import { Breadcrumbs, Link } from "@mui/material"
import { useWeb3React } from "@web3-react/core"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
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

const Dojo = observer(() => {
  const { router, user } = useStores()
  const { account } = useWeb3React()

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
                underline="none"
                color="#99badd"
                onClick={(e) => (router.path = "bangers")}
                href="#bangers"
              >
                Bangers
              </Link>
              <Link
                aria-current={router.path === "dojo"}
                underline="none"
                color="#99badd"
                onClick={(e) => (router.path = "dojo")}
                href="/dojo"
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
