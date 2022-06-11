import { makeObservable, observable } from "mobx"
// import { useMoralis } from "react-moralis"
// import { CHAIN_NAMESPACES as ns } from "@web3auth/base"
// import { Web3Auth } from "@web3auth/web3auth"

import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"

// const CLIENT_ID = process.env.WEB3_AUTH_CLIENT_ID as string

export default class Authentication {
  userName = ""
  email = ""
  connector: WalletConnect
  walletAddress = ""

  constructor() {
    this.connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    })

    makeObservable(this, {
      connector: observable,
    })
  }

  connect = async () => {
    if (!this.connector.connected) {
      this.connector.createSession().then(console.log).catch(console.log)
    } else {
      console.log("connected", this.connector.accounts)
    }
  }
}
