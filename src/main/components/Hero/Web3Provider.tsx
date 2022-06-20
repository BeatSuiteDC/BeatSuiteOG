import { Config, Mainnet } from "@usedapp/core"
import { getDefaultProvider } from "ethers"

import React, { FC } from "react"

const Web3Provider: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  // const SERVER_URL: string | undefined =
  //   process.env.REACT_APP_MORALIS_SERVER_URL
  // const APP_ID: string | undefined = process.env.REACT_APP_MORALIS_APP_ID

  const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL as string
  const APP_ID = process.env.REACT_APP_MORALIS_APP_ID as string

  const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider("mainnet"),
    },
  }

  return (
    <>{children}</>
    // <Web3ReactProvider getLibrary={library}>{children}</Web3ReactProvider>
    // <DAppProvider config={config}>{children}</DAppProvider>
    // <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    //   {children}
    // </MoralisProvider>
  )
}

export default Web3Provider
