import { css, Global } from "@emotion/react"
import { useTheme } from "../../../hooks/useTheme"

export const AudioControlCSS = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        .audioImgSize {
          min-width: 20px;
          height: 20px;
          margin-left: 3px;
          filter: invert(92%) sepia(0%) saturate(0%) hue-rotate(222deg)
            brightness(97%) contrast(86%);
        }

        .audioImgSize2 {
          min-width: 20px;
          height: 20px;
          margin-left: -4px;
          filter: invert(92%) sepia(0%) saturate(0%) hue-rotate(222deg)
            brightness(97%) contrast(86%);
        }

        .audioOnImg,
        .audioOffImg {
          min-width: 20px;
          height: 20px;
          margin-left: -1px;
          filter: invert(92%) sepia(0%) saturate(0%) hue-rotate(222deg)
            brightness(97%) contrast(86%);
        }

        .audioOffImg {
          filter: invert(93%) sepia(19%) saturate(2348%) hue-rotate(296deg)
            brightness(102%) contrast(103%);
        }

        .goFowardBtn {
          border: #c7c7c7 1px solid;
          height: 40px;
          min-width: 40px;
          border-radius: 50%;
          margin-top: 3.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 6px;
          margin-right: 6px;
        }

        .PlayPause,
        .PlayPause2 {
          border: #c7c7c7 1px solid;
          height: 80px;
          min-width: 80px;
          border-radius: 50%;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 120px;
          margin-right: 6px;
        }

        .PlayPause:hover,
        .PlayPause2:hover {
          border: rgb(255, 255, 255) 1px solid;
        }

        .volumeOff,
        .volumeOn {
          border: #c7c7c7 1px solid;
          height: 40px;
          min-width: 40px;
          border-radius: 50%;
          margin-top: 3.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 6px;
          margin-right: 6px;
        }

        .volumeDial {
          border: #c7c7c7 1px solid;
          height: 1px;
          -webkit-appearance: none;
          width: 100px;
          margin-top: 4.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 6px;
          margin-left: 3px;
          border-radius: 30px;
          background-color: #c0c0c0;
        }

        .volumeDial:hover {
          background-color: white;
        }

        .volumeDial::-webkit-slider-thumb {
          -webkit-appearance: none; /* Override default look */
          appearance: none;
          width: 15px; /* Set a specific slider handle width */
          height: 15px; /* Slider handle height */
          background: #c7c7c7; /* Green background */
          cursor: pointer; /* Cursor on hover */
          border-radius: 50%;
        }

        .volumeDial::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          background: #c7c7c7;
          cursor: pointer;
          border: 1px solid whitesmoke;
        }

        .volumeDial::-webkit-slider-thumb:hover {
          background-color: white;
        }

        .playBtn {
          width: 30px;
          height: 30px;
          margin-left: 2px;
          filter: invert(82%) sepia(0%) saturate(0%) hue-rotate(222deg)
            brightness(97%) contrast(86%);
        }

        .playBtn2 {
          width: 30px;
          height: 30px;
          margin-left: 0px;
          filter: invert(82%) sepia(0%) saturate(0%) hue-rotate(222deg)
            brightness(97%) contrast(86%);
        }
      `}
    />
  )
}
