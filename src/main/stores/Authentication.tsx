// import { CHAIN_NAMESPACES } from "@web3auth/base"
// import { Web3Auth } from "@web3auth/web3auth"
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"

import { computed, makeObservable, observable } from "mobx"

const clientId = process.env.REACT_APP_CLIENT_ID as string
const INFURA_ID = process.env.REACT_APP_INFURA_ID as string

export default class Authentication {
  _userName = ""
  _email = ""
  private _connector: WalletConnect
  // private _auth: Web3Auth

  constructor() {
    makeObservable<Authentication, "_connector">(this, {
      _connector: observable,
      address: computed,
      isConnected: computed,
    })

    this._connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    })

    // this._auth = new Web3Auth({
    //   clientId,
    //   chainConfig: {
    //     chainNamespace: CHAIN_NAMESPACES.EIP155,
    //   },
    // })
  }

  get isConnected() {
    return this._connector.connected
  }

  get address() {
    if (!this.isConnected) return ""
    const account = this._connector.accounts[0]
    console.log({ account })
    return `${account.slice(0, 6)}...${account.slice(
      account.length - 4,
      account.length
    )}`
  }

  async connect() {
    if (!this.isConnected) {
      this._connector.createSession().then(console.log).catch(console.error)
    }
  }
}
