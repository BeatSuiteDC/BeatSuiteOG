import styled from "@emotion/styled"
import { Slider } from "@mui/material"
import { observer } from "mobx-react-lite"
import { SyntheticEvent, useEffect } from "react"
import { useStores } from "../../../hooks/useStores"

const Container = styled.div`
  position: absolute;
  bottom: 10%;
  height: 70%;
`

function valuetext(value: number) {
  return `${value}°C`
}

const TimePatrol = observer(() => {
  const {
    services: { streamer },
  } = useStores()

  const { end, begin, current } = streamer.dial(4)

  useEffect(() => {}, [end, begin, current])
  const marks = [
    {
      value: current,
      label: `${Math.round(current * 1)} s`,
    },
    {
      value: end,
      label: `${Math.round(end * 1)} s`,
    },
  ]

  const handleChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    typeof value === "object" && streamer.audio?.setState({ played: value[1] })
    streamer.audio?.setState({ seeking: false })
  }

  const handleSlider = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "object") {
      const [_begin, _current, _end] = newValue

      if (_current != current && streamer.audio !== null) {
        console.log("current changed")
        streamer.audio.setState({ seeking: true })
      }

      const loop = streamer.loop
      streamer.loop = {
        ...loop,
        begin: _begin,
        end: _end,
        current: current,
      }
    }
  }

  return (
    <Container>
      {
        <>
          <Slider
            getAriaLabel={() => "Temperature"}
            orientation="vertical"
            getAriaValueText={valuetext}
            value={[begin, current, end]}
            min={begin}
            max={end}
            defaultValue={[begin, current, end]}
            valueLabelDisplay="auto"
            onChange={handleSlider}
            onChangeCommitted={handleChangeCommitted}
            marks={marks}
          />
        </>
      }
    </Container>
  )
})

export default TimePatrol
