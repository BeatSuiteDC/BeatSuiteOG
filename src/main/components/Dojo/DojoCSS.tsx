import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"
import { useTheme } from "../../hooks/useTheme"
import dashboard from "../../images/dashboard.png"

export const DojoCSS = () => {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Indie+Flower&family=Kdam+Thmor+Pro&display=swap");
        .vid {
          position: relative;
          overflow: hidden;
          z-index: -1;
        }

        .bgImage {
          background-image: url(${dashboard});
          background-size: cover;
          background-position: center center;
          filter: blur(10px);
          width: 100%;
          height: 100vh;
          z-index: -10;
          position: absolute;
        }

        .play {
          margin-left: 40rem;
        }

        .githubLogo {
          min-width: 17px;
          height: 17px;
          filter: invert(92%) sepia(0%) saturate(0%) hue-rotate(222deg)
            brightness(97%) contrast(86%);
          margin-right: 7px;
        }

        .link {
          margin-right: 100px;
          color: #c7c7c7;
          text-decoration: none;
          cursor: pointer;
        }

        .link2 {
          color: #c7c7c7;
          text-decoration: none;
          cursor: pointer;
          margin-top: 3px;
        }

        .link2:hover,
        .link:hover {
          color: white;
        }

        .station:hover,
        station:active {
          background-image: linear-gradient(
            to right,
            #462523 0,
            #cb9b51 5%,
            #f6e27a 10%,
            #f6f2c0 50%,
            #f6e27a 90%,
            #cb9b51 95%,
            #462523 100%
          );
          color: transparent;
          -webkit-background-clip: text;
        }

        .songName {
          min-width: 100%;
          height: 99%;
          text-align: center;
          font-size: 3rem;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: end;
          margin-bottom: 5rem;
        }

        .time {
          width: 100%;
          height: 20%;
          text-align: center;
          font-size: 3rem;
          color: white;
        }

        .infoContainer {
          display: flex;
          flex-direction: column;
          min-width: 20vw;
        }

        .otherSoundsContainer {
          width: 100%;
          height: 10%;
          text-align: center;
          font-size: 3rem;
          color: white;
          display: flex;
          flex-direction: row;
          justify-content: end;
          z-index: 1;
        }

        .otherSounds {
          min-height: 40px;
          min-width: 40px;
          border-radius: 50%;
          border: #c7c7c7 1px solid;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 6px;
          margin-right: 6px;
        }

        .imgSizing {
          min-width: 20px;
          height: 20px;
          margin-left: -1px;
          filter: invert(92%) sepia(0%) saturate(0%) hue-rotate(222deg)
            brightness(97%) contrast(86%);
        }

        .soundDial {
          display: none;
        }

        input[type="range"][orient="vertical"] {
          writing-mode: bt-lr; /* IE */
          width: 50px;
          height: 1px;
          -webkit-appearance: none;
          margin-bottom: 10px;
          margin-left: 0px;
          background-color: #c0c0c0;
          border-radius: 3px;
          border: #c7c7c7 1px solid;
          transform: rotate(270deg);
        }

        .soundDial::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          background: #c7c7c7;
          cursor: pointer;
          border: 1px solid whitesmoke;
          border-radius: 50%;
        }

        .allign {
          display: flex;
          flex-direction: column;
          height: 100px;
          justify-content: end;
        }

        .allign:hover .soundDial {
          display: block;
        }

        .radioStationTitle {
          font-size: 32px;
          width: min-content;
          color: white;
          font-family: "Montserrat", sans-serif;
          font-weight: 200;
          text-transform: uppercase;
          letter-spacing: 7px;
          position: relative;
          border-bottom: 1px white solid;
        }

        .socialIcons {
          filter: invert(100%) sepia(0%) saturate(7485%) hue-rotate(253deg)
            brightness(112%) contrast(103%);
          width: 18px;
          height: 18px;
          margin-bottom: 20px;
          position: absolute;
          top: 112%;
          left: 45%;
        }

        .videoContainer {
          position: absolute;
          filter: blur(10px);
          z-index: -10;
          height: 100%;
          width: 100%;
          top: -220px;
          left: -230px;
        }

        .liveStreamPlayer {
          position: absolute;
          top: -1000px;
          left: -1000px;
        }

        .pauseScreen {
          background-color: black;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0.9;
          z-index: 0;
          text-align: center;
          justify-content: center;
          align-content: center;
          font-size: 1rem;
          color: white;
          font-family: "Montserrat", sans-serif;
          font-weight: 200;
          letter-spacing: 7px;
        }

        .unpauseScreen {
          display: none;
        }

        .container {
          position: absolute;
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        /* Line */
        .container .ring {
          position: relative;
          width: 150px;
          height: 150px;
          margin: -30px;
          border: 4px solid transparent;
          border-radius: 50%;
          border-top: 4px solid #24ecff;
        }
        /* Head of line */
        .container .ring::before {
          content: "";
          position: absolute;
          top: 12px;
          right: 12px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background: #24ecff;
          box-shadow: 0 0 0 5px #24ecff33, 0 0 0 10px #24ecff22,
            0 0 0 20px #24ecff11, 0 0 40px #24ecff, 0 0 50px #24ecff;
        }
        /* Circle Position & Animation */
        .container .ring:nth-child(1) {
          animation: circle2 2s linear infinite;
        }
        .container .ring:nth-child(2) {
          animation: circle1 2s linear infinite;
        }
        .container .ring:nth-child(3) {
          position: absolute;
          top: -66.66px;
          animation: circle 2s linear infinite;
        }
        /* Loading Text */
        .container p {
          overflow: hidden;
          position: absolute;
          color: #fff;
          font-size: 32px;
          font-family: consolas;
          bottom: -120px;
          letter-spacing: 4px;
        }
        /* Animation */
        @keyframes circle {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes circle1 {
          0% {
            transform: rotate(120deg);
          }
          100% {
            transform: rotate(480deg);
          }
        }
        @keyframes circle2 {
          0% {
            transform: rotate(240deg);
          }
          100% {
            transform: rotate(600deg);
          }
        }

        svg {
          margin-top: 20rem;
          width: 170px;
          height: 170px;
          opacity: 1;
        }

        /* SMOKE */
        #smoke-1 {
          stroke-dasharray: 0, 10;
          animation: smoke 6s ease infinite;
        }

        #smoke-2 {
          stroke-dasharray: 0, 10;
          animation: smoke 6s 0.5s ease infinite;
        }

        @keyframes smoke {
          0% {
            stroke-dasharray: 0, 10;
          }
          50% {
            stroke-dasharray: 10, 0;
          }
          100% {
            stroke-dasharray: 10, 0;
            opacity: 0;
          }
        }

        /* WRITING */
        #line-1 {
          opacity: 0;
          animation: writing 0.5s linear forwards;
        }

        #line-2 {
          opacity: 0;
          animation: writing 0.5s 1s linear forwards;
        }

        #line-3 {
          opacity: 0;
          animation: writing 0.5s 1.5s linear forwards;
        }

        #line-4 {
          opacity: 0;
          animation: writing 0.5s 2s linear forwards;
        }

        @keyframes writing {
          0% {
            width: 0px;
            opacity: 1;
          }
          100% {
            width: 14px;
            opacity: 1;
          }
        }

        @media only screen and (max-width: 1189px) {
          .station {
            font-size: 12px;
            margin-right: 10px;
          }

          .logo {
            margin-left: 40px;
          }

          .link {
            font-size: 12px;
          }
        }
      `}
    />
  )
}

export const InterfaceContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fontFamily};
`
export const BackgroundImage = styled.img`
  background-size: cover;
  filter: blur(10px);
  width: 100%;
  height: 100vh;
  z-index: -10;
  position: absolute;
`

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
  margin-left: 20px;
  position: relative;
  align-content: flex-end;
  transition: all 0.3s cubic-bezier(0.175, 0885, 0.32, 1.275);
`

export const LogoDiv = styled.div`
  width: 250%;
  height: 10%;
  text-align: center;
  font-size: 32px;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 7px;
  transform: scale(1, 0.9);
  text-shadow: 1px 1px rgb(0 0 0 / 60%);
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  z-index: 1;
  background-image: linear-gradient(
    to right,
    #462523 0,
    #cb9b51 5%,
    #f6e27a 15%,
    #f6f2c0 30%,
    #f6e27a 55%,
    #cb9b51 78%,
    #462523 100%
  );
  color: transparent;
  -webkit-background-clip: text;
`
export const SubHeader = styled.div`
  width: 99%;
  height: 7%;
  text-align: center;
  font-size: 20px;
  color: white;
  margin-bottom: 2rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 7px;
  transform: scale(1, 0.9);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  text-decoration-line: underline;
`
export const SidePanel = styled.div`
  height: 100vh;
  width: 110px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  backdrop-filter: blur(10px);
`

export const PathContainer = styled.div`
  position: absolute;
  top: 18%;
  left: 18%;
  z-index: -199;
  height: 60%;
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
