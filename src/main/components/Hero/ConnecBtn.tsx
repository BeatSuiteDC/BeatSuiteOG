import { Button } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useStores } from "../../hooks/useStores"

const ConnectWallet: FC = observer(() => {
  const { user } = useStores()

  const login = (event: any) => {
    if (user.isConnected) {
      return <Navigate to="/dojo" />
    }

    console.log("user connected", user.isConnected)
    user.connect()
  }

  return (
    <div className="wrap">
      <Button className="button" onClick={login}>
        Connect Wallet
      </Button>
    </div>
  )
})

export default ConnectWallet
