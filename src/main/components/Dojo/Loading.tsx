import { css, Global } from "@emotion/react"

const LoadingCss = () => {
  return (
    <Global
      styles={css`
        .loading {
          background-color: black;
          width: 2rem;
          height: 2rem;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -200;
          height: 100vh;
          width: 100vw;
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
        .container .ring:nth-of-type(1) {
          animation: circle2 2s linear infinite;
        }
        .container .ring:nth-of-type(2) {
          animation: circle1 2s linear infinite;
        }
        .container .ring:nth-of-type(3) {
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
      `}
    />
  )
}

const Loading = ({ title = "Loading" }) => {
  return (
    <>
      <LoadingCss />
      <div className="loading">
        <div className="container">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
          <p>{title}...</p>
        </div>
      </div>
    </>
  )
}

export default Loading
