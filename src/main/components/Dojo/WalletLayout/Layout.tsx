import styled from "@emotion/styled"
import React, { FC } from "react"
import { useStores } from "../../../hooks/useStores"
import { useTheme } from "../../../hooks/useTheme"
import ConnectWallet from "../../Hero/ConnecBtn"

const Layout: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme()
  const { user } = useStores()
  const Container = styled.div`
    flex-direction: column;
    alignitems: center;
    justifycontent: center;
    background: grey;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 10%;
    border-color: cyan;
    opacity: 0.3;
    box-shadow: 0 0 6px 3px yellow, 0 0 10px 6px #99badd, 0 0 14px 9px cyan;
    :hover {
      opacity: 0.8;
    }
  `

  return (
    <Container>
      <ConnectWallet user={user} />
      {children}
    </Container>
  )
}

export default Layout
