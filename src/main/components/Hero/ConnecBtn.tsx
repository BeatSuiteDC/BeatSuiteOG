import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useStores } from "../../hooks/useStores"

const ConnectWallet: FC = observer(() => {
  const { user } = useStores()

  const login = (event: any) => {
    user.connect().then(() => console.log("User connected", user.isConnected))
  }

  return (
    <div className="wrap">
      {user.isConnected && <Navigate to="/dojo" />}

      <button className="button" onClick={login}>
        Connect Wallet
      </button>
    </div>
  )
})

export default ConnectWallet
