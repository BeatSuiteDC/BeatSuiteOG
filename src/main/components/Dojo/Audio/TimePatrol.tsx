import styled from "@emotion/styled"
import { Slider } from "@mui/material"

const Container = styled.div`
  position: absolute;
  bottom: 10%;
  height: 50%;
`

function valuetext(value: number) {
  return `${value}°C`
}

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
]

const TimePatrol = () => {
  const handleSlider = (e: Event) => {
    console.log("event", e)
  }
  return (
    <Container>
      <Slider
        getAriaLabel={() => "Temperature"}
        orientation="vertical"
        getAriaValueText={valuetext}
        onChange={handleSlider}
        defaultValue={[0, 30, 100]}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Container>
  )
}

export default TimePatrol
