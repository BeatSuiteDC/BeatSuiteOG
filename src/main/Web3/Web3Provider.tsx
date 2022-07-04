import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { WalletConnect } from "@web3-react/walletconnect"
import React, { FC } from "react"
import {
  coinbaseWallet,
  hooks as coinbaseWalletHooks,
} from "./Connectors/coinbaseWallet"
import { hooks as metaMaskHooks, metaMask } from "./Connectors/metaMask"
import { hooks as networkHooks, network } from "./Connectors/network"
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "./Connectors/walletConnect"
import { getName } from "./utils/utils"

const connectors: [
  MetaMask | WalletConnect | CoinbaseWallet | Network,
  Web3ReactHooks
][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, networkHooks],
]

function Child() {
  const { connector } = useWeb3React()
  console.log(`Priority Connector is: ${getName(connector)}`)
  return null
}

const ProviderExample: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Child />
      {children}
    </Web3ReactProvider>
  )
}
export default ProviderExample
