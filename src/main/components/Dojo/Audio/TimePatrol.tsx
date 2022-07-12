import styled from "@emotion/styled"
import { Slider } from "@mui/material"

import { observer } from "mobx-react-lite"
import { SyntheticEvent, useEffect, useState } from "react"
import { useStores } from "../../../hooks/useStores"

const Container = styled.div`
  position: relative;
  bottom: 10%;
  height: 100%;
  width: 5rem;
`

const TimePatrol = observer(() => {
  const stores = useStores()
  const streamer = stores.services.streamer

  const dial = streamer.dial(4)
  const position = streamer.position()

  const { duration } = dial

  const [current, setCurrent] = useState(position)
  const [begin, setBegin] = useState(dial.begin)
  const [end, setEnd] = useState(dial.end)

  useEffect(() => {}, [current, begin, end, streamer.currentTick])

  const marks = [
    {
      value: begin,
      label: `${Math.round(begin)}s`,
    },
    {
      value: current,
      label: `${Math.round(current)}s`,
    },
    {
      value: end,
      label: `${Math.round(end)}s`,
    },
    {
      value: duration,
      label: `${Math.round(duration)}s`,
    },
  ]

  const handleChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (typeof value === "object") {
      const [_begin, _current, _end] = value
      setCurrent(_current)
      setBegin(_begin)
      setEnd(_end)
    } else {
      setCurrent(value)
    }

    if (current != position) {
      console.log("changing here")
      streamer.currentTick = current
    }
  }

  const handleSlider = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "object") {
      const [_begin, _current, _end] = newValue
      setCurrent(_current)
      setBegin(_begin)
      setEnd(_end)

      // if (_begin === begin && _end === end) {
      //   console.log("Seeking")
      //   streamer.audio?.setState({ seeking: true })
      // }
    } else {
      setCurrent(newValue)
    }

    const sample = streamer.active.sample
    streamer.active.sample = {
      ...sample,
      begin,
      end,
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
          value={[begin, current, end]}
          min={0}
          max={duration}
          step={0.0001 * duration}
          defaultValue={current}
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
