import React, { FC, useState } from "react"
import { AlbumProps, bears } from "../Featured/Featured"
import { CardDiv, Container, List } from "./CSS"

export type PosterProps = {
  album: AlbumProps
  key: number
  active: boolean
}

const Poster: FC = () => {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState)
  const [active, setActive] = useState(false)

  return (
    <Container>
      {/* <PosterCSS /> */}
      <List>
        {bears.map((slide, i) => {
          return <Slide active={active} album={slide} key={i}></Slide>
        })}
        {/* <button onClick={() => dispatch({ type: "PREV" })}>{"<<"}</button>

        <button on Click={() => dispatch({ type: "NEXT" })}>{">>"}</button> */}
      </List>
    </Container>
  )
}
export default Poster

const initialState = {
  slideIndex: 0,
}

const slidesReducer = (state: any, event: any) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % bears.length,
    }
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? bears.length - 1 : state.slideIndex - 1,
    }
  }
}

const Slide: FC<PosterProps> = ({ album, active, key }) => {
  return (
    <CardDiv key={key} style={{ backgroundImage: `url('${album.cover}')` }}>
      <div className="slideContentInner">
        <h2 className="slideTitle">{album.album}</h2>
        <h3 className="slideSubtitle">{album.song}</h3>
        <p className="slideDescription">{album.duration}</p>
        <p>
          {active} | {key}
        </p>
      </div>
      <button>Play</button>
    </CardDiv>
  )
}
