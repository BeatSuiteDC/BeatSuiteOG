import styled from "@emotion/styled"
import { Slider } from "@mui/material"

import { observer } from "mobx-react-lite"
import { SyntheticEvent, useEffect, useRef } from "react"
import { useStores } from "../../../hooks/useStores"

const Container = styled.div`
  position: relative;
  bottom: 50%;
  height: 70%;
  width: 5rem;
`

function valuetext(value: number) {
  return `${value}°C`
}

const TimePatrol = observer(() => {
  const {
    services: { streamer },
  } = useStores()

  const { end, begin, current, duration } = streamer.dial(4)

  const currentRef = useRef<HTMLInputElement>(null)
  const beginRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)
  const range = useRef<HTMLDivElement>(null)

  const marks = [
    {
      value: begin,
      label: `${Math.round(begin * 1)}s`,
    },
    {
      value: current,
      label: `${Math.round(current * 1)}s`,
    },
    {
      value: end,
      label: `${Math.round(end * 1)}s`,
    },
  ]

  useEffect(() => {}, [end, begin, current, duration])

  const handleChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (typeof value === "object") {
      const progress = value[1] / value[2]
      console.log("change commited", progress)
      streamer.audio?.seekTo(progress, "fraction")
      streamer.audio?.setState({ played: progress })
      streamer.audio?.setState({ seeking: false })
    }
  }

  const handleSlider = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "object") {
      const [_begin, _current, _end] = newValue

      if (_current != current && streamer.audio !== null) {
        console.log("Seeking")
        streamer.audio.setState({ seeking: true })
      }

      const sample = streamer.active.sample
      streamer.active.sample = {
        ...sample,
        current: _current,
        begin: _begin,
        end: _end,
      }
    }
  }

  // const setPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.valueAsNumber
  //   streamer.active.sample.current = value
  // }
  // const setBegin = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.valueAsNumber
  //   streamer.active.sample.begin = value
  // }
  // const setEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.valueAsNumber

  //   streamer.active.sample.end = value
  // }

  return (
    <Container>
      <>
        <Slider
          getAriaLabel={() => "Time Patrol"}
          orientation="vertical"
          getAriaValueText={valuetext}
          value={[begin, current, end]}
          min={0}
          max={duration}
          defaultValue={[begin, current, end]}
          valueLabelDisplay="auto"
          onChange={handleSlider}
          onChangeCommitted={handleChangeCommitted}
          marks={marks}
        />
      </>
    </Container>
  )
})

export default TimePatrol
