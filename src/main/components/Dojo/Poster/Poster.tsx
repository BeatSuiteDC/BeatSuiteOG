import React, { FC } from "react"
import { Container, SlideDiv, SlidesDiv } from "./CSS"

export type PosterProps = {
  album: AlbumProps
  key: number
  offset: number
}

export type AlbumProps = {
  title: string
  subtitle: string
  description: string
  image: string
}

const Poster: FC = () => {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState)

  return (
    <Container>
      {/* <PosterCSS /> */}
      <SlidesDiv>
        {slides.map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i)
          return <Slide offset={offset} album={slide} key={i}></Slide>
        })}
        <button onClick={() => dispatch({ type: "PREV" })}>{"<<"}</button>

        <button onClick={() => dispatch({ type: "NEXT" })}>{">>"}</button>
      </SlidesDiv>
    </Container>
  )
}
export default Poster

const slides = [
  {
    title: "Machu Picchu",
    subtitle: "Peru",
    description: "Adventure is never far away",
    image:
      "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
  {
    title: "Chamonix",
    subtitle: "France",
    description: "Let your dreams come true",
    image:
      "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
  {
    title: "Mimisa Rocks",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
  {
    title: "Four",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
  {
    title: "Five",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
]

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
      slideIndex: (state.slideIndex + 1) % slides.length,
    }
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    }
  }
}

const Slide: FC<PosterProps> = ({ album, offset, key }) => {
  const active = offset === 0 ? true : null
  // const ref = useTilt(active)

  return (
    <SlideDiv key={key} className="slide" data-active={active}>
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${album.image}')`,
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${album.image}')`,
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{album.title}</h2>
          <h3 className="slideSubtitle">{album.subtitle}</h3>
          <p className="slideDescription">{album.description}</p>
          <p>{offset}</p>
        </div>
      </div>
    </SlideDiv>
  )
}
