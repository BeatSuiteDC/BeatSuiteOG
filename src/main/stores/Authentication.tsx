// import { CHAIN_NAMESPACES } from "@web3auth/base"
// import { Web3Auth } from "@web3auth/web3auth"
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"

import { Wallet } from "ethers"

import { computed, makeObservable, observable } from "mobx"

const clientId =
  "BL1AnHFk8uLnS2aeaIZHZD6SCXg96A63VoGH4yyVOw-cjtN1lbPio-m0qwAZX6aUjDnFzKFj5xJ1ivzXkCZRpp0"

const INFURA_ID = process.env.REACT_APP_INFURA_ID as string

export default class Authentication {
  _userName = ""
  _email = ""
  walletAddress = ""
  _wallet: Wallet | undefined
  _auth: any
  _connector: WalletConnect

  constructor() {
    makeObservable<Authentication, "_connector">(this, {
      _connector: observable,
      isConnected: computed,
    })

    this._connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    })
  }

  get isConnected() {
    return this._connector.connected
  }

  async connect() {
    if (!this.isConnected) {
      this._connector.createSession().then(console.log).catch(console.error)
    }
  }
}
