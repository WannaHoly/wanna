import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 3

class Block {
// 1. 完成构造函数及其参数

  constructor(blockChain,preHash,index,hash,miner){
    this.blockChain = blockChain
    this.preHash = preHash
    this.index = index
    this.hash = hash
    this.coinbaseBeneficiary = miner
    this.utxoPool = blockChain.coinBaseTransaction(preHash,miner)
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

  //每次更改随机数值，就更新hash值
  setNonce(nonce) {
    this.hash = nonce
  }

  // 根据交易变化更新区块 hash
  _setHash() {}

  // 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
  combinedTransactionsHash() {}

  // 添加交易到区块
  /**
   *
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction() {}

  // 添加签名校验逻辑
  isValidTransaction(transaction) {
    
  }
}

export default Block
