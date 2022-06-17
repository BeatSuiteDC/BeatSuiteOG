import { css, Global } from "@emotion/react"

const AntdCSS = () => {
  return (
    <Global
      styles={css`
        @import "~antd/dist/antd.css";

        .ant-layout {
          min-height: 100vh;
        }

        .ant-layout-sider {
          background-image: linear-gradient(#1e2422, #000000);
          background-attachment: fixed;
          width: 800px;
          padding: 30px;
        }

        .ant-layout-content {
          background-image: linear-gradient(#494b4a, #030404);
          background-attachment: fixed;
        }

        .ant-layout-footer {
          background-color: #292929;
          padding-bottom: 4px;
          padding-top: 15px;
        }

        .ant-tabs-top > .ant-tabs-nav::before {
          border-bottom: 0px;
        }

        .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white;
          text-shadow: 0 0 0.25px currentcolor;
        }

        .ant-tabs-tab-btn:focus {
          color: white;
        }

        .ant-tabs-tab {
          color: rgb(125, 125, 125);
          font-size: 18px;
          letter-spacing: 2px;
        }

        .ant-tabs-tab:hover {
          color: white;
        }

        .ant-tabs-ink-bar {
          background: #1db954;
          width: 10px;
        }

        .ant-slider-track {
          background-color: #1db954;
        }

        .ant-slider:hover .ant-slider-track {
          background-color: #1db954;
        }

        .ant-slider-handle {
          border: 0px;
        }

        .ant-slider-rail {
          background-color: #3e3e3e;
        }
      `}
    />
  )
}

export default AntdCSS
