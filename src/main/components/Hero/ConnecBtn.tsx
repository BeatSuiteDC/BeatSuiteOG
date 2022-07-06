import { useWeb3React } from "@web3-react/core"
import { FC } from "react"

const ConnectWallet: FC = () => {
  const context = useWeb3React()

  const login = async (event: any) => {
    context.connector.activate()
  }

  return (
    <div className="wrap">
      <a href="/app">
        <button className="button" onClick={login}>
          Connect Wallet
        </button>
      </a>
    </div>
  )
}

export default ConnectWallet
