import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useStores } from "../../hooks/useStores"

const ConnectWallet: FC = observer(() => {
  const { user } = useStores()

  const login = async (event: any) => {
    const result = await user.connect()
  }

  return (
    <div className="wrap">
      {user.isConnected && <Navigate to="/app" />}

      <button className="button" onClick={login}>
        Connect Wallet
      </button>
    </div>
  )
})

export default ConnectWallet
