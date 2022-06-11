import { observer } from "mobx-react-lite"
import { FC } from "react"
import { useStores } from "../../hooks/useStores"

const ConnectWallet: FC = observer(() => {
  const { user } = useStores()
  const USER = user.connector

  const login = (event: any) => {
    event.preventDefault()
    console.log(USER)
    user.connect()
    console.log(USER)
  }
  return (
    <div className="wrap">
      <button className="button" onClick={login}>
        Connect Wallet
      </button>
    </div>
  )
})

export default ConnectWallet
