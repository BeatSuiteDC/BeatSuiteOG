// import WalletConnect from "@walletconnect/client"
// import QRCodeModal from "@walletconnect/qrcode-modal"
// import { CHAIN_NAMESPACES } from "@web3auth/base"
// import { Web3Auth } from "@web3auth/web3auth"

// import WalletConnectProvider from "@walletconnect/web3-provider"

import { providers } from "ethers"
const { Web3Provider } = providers

import { computed, makeObservable, observable } from "mobx"
import { useWeb3Context } from "web3-react"
import { Web3Context } from "web3-react/dist/context"
import { User } from "../../common/sanity/Sanity"

const INFURA_ID = process.env.REACT_APP_INFURA_ID as string

export default class Authentication {
  private _user: User = {}
  private _isConnected = false

  web3: Web3Context

  constructor() {
    makeObservable<Authentication, "_isConnected" | "_user">(this, {
      _user: observable,
      _isConnected: observable,
      address: computed,
      isConnected: computed,
      info: computed,
    })

    this.web3 = useWeb3Context()
  }

  get isConnected() {
    const web3 = this.web3.account
    console.log({ web3 })
    return this.web3.account ? true : false
  }

  get info() {
    return {
      ...this._user,
    }
  }

  set info(_user: User) {
    this._user = {
      ...this.info,
      ..._user,
    }
  }

  get address() {
    if (!this.isConnected) return ""
    const account = "this is an account for now"
    console.log({ account })
    return `${account.slice(0, 6)}...${account.slice(
      account.length - 4,
      account.length
    )}`
  }

  async connect() {
    if (!this.isConnected) {
    }
    // if (!this.isConnected) {
    //   this._connector.createSession()
    //   this._connector.on("connect", (err, payload) => {
    //     if (err) throw err
    //     const { accounts } = payload.params[0]
    //     if (accounts) {
    //       this._walletAddress = accounts[0]
    //       sanityUser(accounts[0]).then((user) => {
    //         this.info = user
    //         console.log("user", this.info)
    //       })
    //     }
    //   })
    // } else if (!this.info) {
    //   await sanityUser(this._connector.accounts[0]).then((user) => {
    //     this.info = user
    //     console.log("user", this.info)
    //   })
    // }
    // console.log("user", this.info)

    return this.isConnected
  }

  async logout() {}
}
