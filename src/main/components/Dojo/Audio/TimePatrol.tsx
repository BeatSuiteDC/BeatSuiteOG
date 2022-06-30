import styled from "@emotion/styled"
import { Slider } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEffect, useRef } from "react"
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

  const dialRef = useRef<HTMLInputElement>(null)

  const { end, begin, current } = streamer.dial()

  useEffect(() => {
    console.log({ end, begin, current })
  }, [end, begin, current])
  const marks = [
    {
      value: begin,
      label: `${begin}`,
    },
    {
      value: current,
      label: `${current}`,
    },
    {
      value: end,
      label: `${end}`,
    },
  ]

  const handleSlider = (e: any) => {}

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
            marks={marks}
          />
        </>
      }
    </Container>
  )
})

export default TimePatrol
