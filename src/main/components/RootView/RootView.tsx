import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { localized } from "../../../common/localize/localizedString"
import { useStores } from "../../hooks/useStores"
import { ArrangeEditor } from "../ArrangeView/ArrangeEditor"
import { BuildInfo } from "../BuildInfo"
import { EventEditor } from "../EventEditor/EventEditor"
import { ExportDialog } from "../ExportDialog/ExportDialog"
import { ExportProgressDialog } from "../ExportDialog/ExportProgressDialog"
import { HelpDialog } from "../Help/HelpDialog"
import { MIDIDeviceDialog } from "../MIDIDeviceView/MIDIDeviceDialog"
import { Navigation } from "../Navigation/Navigation"
import { PianoRollEditor } from "../PianoRoll/PianoRollEditor"
import { TempoEditor } from "../TempoGraph/TempoEditor"
import { TransportPanel } from "../TransportPanel/TransportPanel"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`

const Column = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const Routes: FC<React.PropsWithChildren<unknown>> = observer(() => {
  const { router, user } = useStores()
  const path = router.path
  console.log("path", path)
  return (
    <>
      {path === "/track" && <PianoRollEditor />}
      {path === "/tempo" && <TempoEditor />}
      {path === "/arrange" && <ArrangeEditor />}
    </>
  )
})

const RootView: FC<React.PropsWithChildren<unknown>> = () => (
  <>
    <Column>
      <Navigation />
      <Container>
        <Routes />
        <TransportPanel />
        <BuildInfo />
        <EventEditor />
      </Container>
    </Column>
    <HelpDialog />
    <MIDIDeviceDialog />
    <ExportDialog />
    <ExportProgressDialog />
  </>
)

window.onbeforeunload = (e: BeforeUnloadEvent) => {
  e.returnValue = localized(
    "confirm-close",
    "Your edits have not been saved. Be sure to download it before exiting. Do you really want to close it?"
  )
}

export default RootView
