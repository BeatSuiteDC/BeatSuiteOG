import { computed, makeObservable, observable } from "mobx"

const INFURA_ID = process.env.REACT_APP_INFURA_ID as string

export type User = {
  address?: string | undefined
  name?: string | undefined
  id?: string | undefined
}

export default class Authentication {
  private _user: User | undefined

  web3: any

  constructor() {
    makeObservable<Authentication, "_user">(this, {
      _user: observable,
      address: computed,
      isConnected: computed,
      info: computed,
    })
  }

  get isConnected() {
    const web3 = this.web3.account
    console.log({ web3 })
    return this.web3.account ? true : false
  }

  get info() {
    if (!this._user) {
      return undefined
    }
    return {
      ...this._user,
    }
  }

  set info(_user: User | undefined) {
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
