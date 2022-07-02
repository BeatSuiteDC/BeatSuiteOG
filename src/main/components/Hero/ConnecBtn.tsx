import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useStores } from "../../hooks/useStores"

const ConnectWallet: FC = () => {
  const { user } = useStores()

  const login = async (event: any) => {
    const result = await user.connect().then((res) => {
      console.log("res", res)
    })
    console.log("result", result)
  }

  return (
    <div className="wrap">
      {user.isConnected && <Navigate to="/dojo" />}

      <button className="button" onClick={login}>
        Connect Wallet
      </button>
    </div>
  )
}

export default ConnectWallet
