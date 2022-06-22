import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { DEFAULT_TEMPO } from "../../../../common/player"
import {
  fastForwardOneBar,
  playOrPause,
  rewindOneBar,
  stop,
  toggleEnableLoop,
} from "../../../actions"
import { useStores } from "../../../hooks/useStores"

const Toolbar = styled.div`
  background: ${({ theme }) => theme.tertiaryTextColor};
  width: 99%;
  height: 10vh;
  text-align: center;
  font-size: 3rem;
  color: yellow;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  margin-top: auto;
  z-index: 1;
`

const TempoInput = styled.input`
  background: transparent;
  -webkit-appearance: none;
  border: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  width: 5em;
  text-align: center;
  outline: none;
  font-family: "Roboto Mono", monospace;
  font-size: 1rem;
  padding: 0.3rem 0;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const Button = styled.div`
  --webkit-appearance: none;
  outline: none;
  border: none;
  border-radius: 100%;
  margin: 0.25rem;
  padding: 0.4rem;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  cursor: poinpter;

  :hover {
    background: #ffffff0d;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`

const PlayButton = styled(Button)`
  background: ${({ theme }) => theme.themeColor};

  &:hover {
    background: ${({ theme }) => theme.themeColor};
    opacity: 0.8;
  }

  &.active {
    background: ${({ theme }) => theme.themeColor};
  }
`

const LoopButton = styled(Button)`
  &.active {
    color: ${({ theme }) => theme.themeColor};
  }
`

const TempoWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  padding-left: 0.7rem;
  border-radius: 0.25rem;

  label {
    font-size: 0.6rem;
    color: ${({ theme }) => theme.secondaryTextColor};
  }

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.dividerColor};
    background: #ffffff14;
  }
`

const TempoForm: FC<React.PropsWithChildren<unknown>> = observer(() => {
  const rootStore = useStores()
  const tempo = rootStore.pianoRollStore.currentTempo ?? DEFAULT_TEMPO

  const changeTempo = (tempo: number) => {
    const fixedTempo = Math.max(1, Math.min(512, tempo))
    rootStore.song.conductorTrack?.setTempo(
      fixedTempo,
      rootStore.services.player.position
    )
    rootStore.services.player.currentTempo = fixedTempo
  }

  const onKeyPressTempo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  const onChangeTempo = (e: React.ChangeEvent<HTMLInputElement>) =>
    changeTempo(parseFloat(e.target.value))

  return (
    <TempoWrapper>
      <label htmlFor="tempo-input">BPM</label>
      <TempoInput
        type="number"
        id="tempo-input"
        min={1}
        max={1000}
        value={Math.round(tempo * 100) / 100}
        step={1}
        onChange={onChangeTempo}
        onKeyPress={onKeyPressTempo}
      />
    </TempoWrapper>
  )
})

const TimestampText = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryTextColor};
`

const Timestamp: FC<React.PropsWithChildren<unknown>> = observer(() => {
  const { pianoRollStore } = useStores()
  const mbtTime = pianoRollStore.currentMBTTime
  return <TimestampText>{mbtTime}</TimestampText>
})

export const ToolbarSeparator = styled.div`
  background: ${({ theme }) => theme.dividerColor};
  margin: 0.4em 1em;
  width: 1px;
  height: 1rem;
`

export const Right = styled.div`
  position: absolute;
  right: 1em;
`

export const PlayerPanel: FC<React.PropsWithChildren<unknown>> = observer(
  () => {
    const rootStore = useStores()
    const {
      services: { player },
    } = rootStore

    const { isPlaying, loop } = player

    const onClickPlay = playOrPause(rootStore)
    const onClickStop = stop(rootStore)
    const onClickBackward = rewindOneBar(rootStore)
    const onClickForward = fastForwardOneBar(rootStore)
    const onClickEnableLoop = toggleEnableLoop(rootStore)

    return (
      <Toolbar>
        {/* <Tooltip title={`${localized("rewind", "Rewind")}`} placement="top">
          <Button onClick={onClickBackward}>
            <FastRewind />
          </Button>
        </Tooltip>
        <Tooltip title={`${localized("stop", "Stop")}`} placement="top">
          <Button onClick={onClickStop}>
            <Stop />
          </Button>
        </Tooltip>
        <Tooltip
          title={`${localized("play-pause", "Play/Pause")} [space]`}
          placement="top"
        >
          <PlayButton
            id="button-play"
            onClick={onClickPlay}
            className={isPlaying ? "active" : undefined}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </PlayButton>
        </Tooltip>
        <Tooltip
          title={`${localized("fast-forward", "Fast Forward")}`}
          placement="top"
        >
          <Button onClick={onClickForward}>
            <FastForward />
          </Button>
        </Tooltip>
        {loop && (
          <LoopButton
            onClick={onClickEnableLoop}
            className={loop.enabled ? "active" : undefined}
          >
            <Loop />
          </LoopButton>
        )} */}
        <ToolbarSeparator />
        <TempoForm />
        <ToolbarSeparator />
        <Timestamp />
      </Toolbar>
    )
  }
)
