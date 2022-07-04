import { FC } from "react"
import MetaMaskCard from "../../Web3/ConnectorCards/MetaMaskCard"
import WalletConnectCard from "../../Web3/ConnectorCards/WalletConnectCard"

const Wallets: FC = () => {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexFlow: "wrap",
          fontFamily: "sans-serif",
        }}
      >
        <MetaMaskCard />
        <WalletConnectCard />
      </div>
    </div>
  )
}

export default Wallets
