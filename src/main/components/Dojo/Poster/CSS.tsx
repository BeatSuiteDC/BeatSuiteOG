import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"

export const PosterCSS = () => {
  return (
    <>
      <Global
        styles={css`
          .slideCard {
            height: 35%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            overflow: hidden;
            grid-template-columns: auto auto;
          }
        `}
      />
    </>
  )
}

const backupCss = `
.slideContent {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: transform 0.5s ease-in-out;
  opacity: 0.7;

  display: grid;
  align-content: center;

  transform-style: preserve-3d;
  transform: perspective(1000px)
    translateX(calc(100% * var(--offset)))
    rotateY(calc(-45deg * var(--dir)));
}

.slideContentInner {
  transform-style: preserve-3d;
  transform: translateZ(2rem);
  transition: opacity 0.3s linear;
  text-shadow: 0 0.1rem 1rem #000;
  opacity: 0;

  .slideSubtitle,
  .slideTitle {
    font-size: 2rem;
    font-weight: normal;
    letter-spacing: 0.2ch;
    text-transform: uppercase;
    margin: 0;
  }

  .slideSubtitle::before {
    content: "— ";
  }

  .slideDescription {
    margin: 0;
    font-size: 0.8rem;
    letter-spacing: 0.2ch;
  }
}

.slideBackground {
  position: fixed;
  top: 0;
  left: -10%;
  right: -10%;
  bottom: 0;
  background-size: cover;
  background-position: center center;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s linear, transform 0.3s ease-in-out;
  pointer-events: none;

  transform: translateX(calc(10% * var(--dir)));
}

.slide[data-active] {
  z-index: 2;
  pointer-events: auto;

  .slideBackground {
    opacity: 0.2;
    transform: none;
  }

  .slideContentInner {
    opacity: 1;
  }

  .slideContent {
    --x: calc(var(--px) - 0.5);
    --y: calc(var(--py) - 0.5);
    opacity: 1;

    transform: perspective(1000px);

    &:hover {
      transition: none;
      transform: perspective(1000px) rotateY(calc(var(--x) * 45deg))
        rotateX(calc(var(--y) * -45deg));
    }
  }
}
`
export const Button = styled.button`
  border: none;
  color: white;
  position: absolute;
  width: 5rem;
  height: 5rem;
  top: 30%;
  transition: opacity 0.3s;
  opacity: 0.7;
  z-index: 5;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  &:first-child {
    left: -50%;
  }
  &:last-child {
    right: -50%;
  }
`

export const CardDiv = styled.div`
  width: 200px;
  height: 260px;
  border-radius: 50px;
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: ease-out 200ms;
  margin-left: auto;
  margin-right: auto;
  :hover {
    scale: 1.05;
    color: rgba(255, 255, 255, 1);
  }
`

export const AlbumImg = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  border-radius: 50px;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
`
export const IconDiv = styled.div`
  position: absolute;
  bottom: 2.5rem;
  inset-x: 0;
  display: flex;
  align-items: center;
  margin-left: 0.875rem;
`

export const PlayPauseIcon = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  background: #99badd;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-shrink: 0;
  :hover {
    background: white;
  }
`

export const Title = styled.h4`
  font-weight: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 11rem;
`

const _CardDiv = styled.div`
  margin: 10px;
  background: #99badd;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.75);
  display: flex;
  background-size: cover;
  justify-content: center;
  background-position: center center;
  position: relative;
  align-items: center;
  min-width: 15vw;
  height: 25vh;
  :hover {
    border-color: #99badd;
    border-width: 2px;
  }
`

export const SlideDiv = styled.div`
  height: 10;
  outline: 1px solid;
  background-size: cover;
  background-position: center center;
  flex-flow: row-wrap;
`

export const List = styled.div`
  height: 100%;
  width: 60rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  overflow-x: scroll;
  position: relative;
`

export const Container = styled.div`
  height: 35%;
  width: 100%;
  display: grid;
  justify-content: flex-start;
  position: relative;
  overflow-y: scroll;
  padding: 1rem;
  column-gap: 1rem;
  row-gap: 2rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`
const _Container = styled.div`
  height: 35%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;
  grid-template-columns: auto auto;
`
