import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"

export const PosterCSS = () => {
  return (
    <>
      <Global
        styles={css`
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
        `}
      />
    </>
  )
}

const Button = styled.button`
  border: none;
  color: white;
  position: absolute;
  font-size: 5rem;
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
export const SlidesDiv = styled.div`
  display: grid;
  height: 100%;
  > .slide {
    grid-area: 1 / -1;
  }
`

export const SlideDiv = styled.div`
  width: 30vw;
  height: 40vw;
  outline: 1px solid;
`

export const Container = styled.div`
  background: grey;
  height: 40%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
