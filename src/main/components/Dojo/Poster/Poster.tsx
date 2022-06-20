import React, { FC } from "react"
import { AlbumProps, bears } from "../Featured/Featured"
import { CardDiv, Container, List } from "./CSS"

export type PosterProps = {
  album: AlbumProps
  key: number
  offset: number
}

const Poster: FC = () => {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState)

  return (
    <Container>
      {/* <PosterCSS /> */}
      <List>
        {bears.slice(0, 4).map((slide, i) => {
          let offset = bears.length + (state.slideIndex - i)
          return <Slide offset={offset} album={slide} key={i}></Slide>
        })}
        {/* <button onClick={() => dispatch({ type: "PREV" })}>{"<<"}</button>

        <button on Click={() => dispatch({ type: "NEXT" })}>{">>"}</button> */}
      </List>
    </Container>
  )
}
export default Poster

// const useTilt = (active: boolean | null) => {
//   const ref = React.useRef()

//   React.useEffect(() => {
//     if (!ref.current || !active) {
//       return
//     }

//     const state = {
//       rect: undefined,
//       mouseX: undefined,
//       mouseY: undefined,
//     }

//     let el = ref.current

//     const handleMouseMove = (e) => {
//       if (!el) {
//         return
//       }
//       if (!state.rect) {
//         state.rect = el.getBoundingClientRect()
//       }
//       state.mouseX = e.clientX
//       state.mouseY = e.clientY
//       const px = (state.mouseX - state.rect.left) / state.rect.width
//       const py = (state.mouseY - state.rect.top) / state.rect.height

//       el.style.setProperty("--px", px)
//       el.style.setProperty("--py", py)
//     }

//     el.addEventListener("mousemove", handleMouseMove)

//     return () => {
//       el.removeEventListener("mousemove", handleMouseMove)
//     }
//   }, [active])

//   return ref
// }

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

const Slide: FC<PosterProps> = ({ album, offset, key }) => {
  const active = offset === 0 ? true : null
  return (
    <CardDiv
      key={key}
      data-active={active}
      style={{ backgroundImage: `url('${album.cover}')` }}
    >
      <div className="slideContentInner">
        <h2 className="slideTitle">{album.album}</h2>
        <h3 className="slideSubtitle">{album.song}</h3>
        <p className="slideDescription">{album.duration}</p>
      </div>
    </CardDiv>
    // <SlideDiv key={key} className="slide" data-active={active}>
    //   <div
    //     className="slideBackground"
    //     style={{
    //       backgroundImage: `url('${album.image}')`,
    //     }}
    //   />
    //   <div
    //     className="slideContent"
    //     style={{
    //       backgroundImage: `url('${album.image}')`,
    //     }}
    //   >
    //     <div className="slideContentInner">
    //       <h2 className="slideTitle">{album.title}</h2>
    //       <h3 className="slideSubtitle">{album.subtitle}</h3>
    //       <p className="slideDescription">{album.description}</p>
    //       <p>{offset}</p>
    //     </div>
    //   </div>
    // </SlideDiv>
  )
}
