import styled from "@emotion/styled"
import { Input, Slider } from "@mui/material"
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

  const max = streamer.audio ? streamer.audio.getDuration() * 1.2 : 10 ** 5

  useEffect(() => {}, [end, begin, current])
  const marks = [
    {
      value: current,
      label: `${Math.round(current * 1)}s`,
    },
  ]

  const handleChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (typeof value === "object") {
      const progress = value[1] / value[2]
      console.log("progress", progress)
      streamer.audio?.setState({ played: progress })
      streamer.audio?.seekTo(progress, "fraction")
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

      const loop = streamer.loop
      streamer.loop = {
        ...loop,
        current: current,
        begin: _begin,
        end: _end,
      }
    }
  }

  const setBegin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber
    // if (value > current || value < 0) {
    //   return
    // }
    streamer.loop.begin = value
  }
  const setEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber
    // if (value < current || value > max) {
    //   return
    // }
    console.log({ value, max })
    streamer.loop.end = value
  }

  const STEP = 0.05 * (end - begin)

  return (
    <Container>
      {
        <>
          <Input
            sx={{
              width: "100%",
              margin: "1px",
              position: "absolute",
              left: "20%",
              top: "-8%",
              textAlign: "right",
            }}
            value={end}
            size="small"
            onChange={setEnd}
            // onBlur={handleBlur}
            inputProps={{
              step: STEP,
              min: current,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
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
          <Input
            sx={{
              width: "100%",
              margin: "1px",
              position: "absolute",
              left: "20%",
              bottom: "-8%",
              textAlign: "right",
            }}
            value={begin}
            size="small"
            onChange={setBegin}
            // onBlur={handleBlur}
            inputProps={{
              step: 0.05 * (end - begin) || current - 0.00001,
              min: 0,
              max: current - 0.0001,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </>
      }
    </Container>
  )
})

export default TimePatrol
