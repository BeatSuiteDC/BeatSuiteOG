import { useWeb3React } from "@web3-react/core"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Navigate } from "react-router-dom"

const ConnectWallet: FC = observer(() => {
  const context = useWeb3React()

  const login = async (event: any) => {}

  return (
    <div className="wrap">
      {context.account && <Navigate to="/app" />}

      <button className="button" onClick={login}>
        Connect Wallet
      </button>
    </div>
  )
})

export default ConnectWallet
