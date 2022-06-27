// import WalletConnect from "@walletconnect/client"
// import QRCodeModal from "@walletconnect/qrcode-modal"
// import { CHAIN_NAMESPACES } from "@web3auth/base"
// import { Web3Auth } from "@web3auth/web3auth"

// import WalletConnectProvider from "@walletconnect/web3-provider"
// import { providers } from "ethers"

// const { Web3Provider } = providers

import { computed, makeObservable, observable } from "mobx"
import { User } from "../../common/sanity/Sanity"

const INFURA_ID = process.env.REACT_APP_INFURA_ID as string

export default class Authentication {
  private _user: User
  private _provider: any
  private _isConnected: boolean

  constructor() {
    makeObservable<Authentication, "_isConnected" | "_provider" | "_user">(
      this,
      {
        _user: observable,
        _provider: observable,
        _isConnected: observable,
        address: computed,
        isConnected: computed,
        info: computed,
      }
    )

    // this._provider = new WalletConnectProvider({
    //   infuraId: INFURA_ID,
    // })

    this._isConnected = false
    this._user = {}
  }

  get isConnected() {
    return this._isConnected
  }

  get info() {
    return {
      ...this._user,
    }
  }

  set info(_user: User) {
    Object.assign(this._user, { ..._user })
  }

  get address() {
    // if (!this.isConnected) return ""
    // const account = this._provider.accounts[0]
    // console.log({ account })
    // return `${account.slice(0, 6)}...${account.slice(
    //   account.length - 4,
    //   account.length
    // )}`
    return false
  }

  async connect() {
    // if (!this.isConnected) {
    //   await this._provider.enable()
    // this._provider.connector.on("connect", (error, payload) => {
    //   console.log("payload", payload)
    // })
    // }
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
  }

  async logout() {
    // if (!this.isConnected) {
    //   console.log("already disconnected")
    //   return
    // }
    // this._connector.killSession()
    // this._connector.on("disconnect", (err, payload) => {
    //   if (err) throw err
    //   this._user = undefined
    //   console.log("logged out")
    // })
  }
}
