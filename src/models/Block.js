import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(blockChain,preHash,index,hash) {
    this.blockChain = blockChain
    this.preHash = preHash
    this.index = index
    this.hash = hash
  }

  isValid() {
    //获取hash值的前difficulty个位，用于验证
    let validhash = this.hash.slice(0,DIFFICULTY)
    //获得验证通过的条件
    let validStr = ""
    for (let i=0;i < DIFFICULTY;i++){
      validStr += "0"
    }
    //hash值是否能通过，若至少前diff个位为零就验证通过
    if (validStr == validhash){
      return true
    }
    return false
  }

  setNonce(nonce) {
    this.hash = nonce
  }
  
}

export default Block

