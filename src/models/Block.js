import MerkleTree from './MerkleTree.js';
import {calcNonce} from '../utils.js';
import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(blockChain,preHash,index,hash,miner){
    this.blockChain = blockChain
    this.preHash = preHash
    this.index = index
    this.hash = hash
    this.coinbaseBeneficiary = miner
    this.utxoPool = blockChain.coinBaseTransaction(preHash,miner)
    //lesson5 添加存储交易属性.区块应该存放merkleroot,但是根据题意，这里应该是矿工的交易池,所以用一个交易数组存放交易
    this.trxs = []
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
  // lesson5
  // 思路： 要更新区块链中的hash映射关系，先从链里获得区块，然后重新计算区块难度（总感觉哪里不对）
  _setHash() {
    //获得块
    var block = this.blockChain.blocks[this.hash]
    //重新计算块,设置hash模拟交易更新过程
    block.hash = sha256(new Date().getTime().toString()).toString()
    var newBlock = calcNonce(block)
    //删除原来的块
    delete this.blockChain.blocks[this.hash]
    //将修改的块添加上去
    this.blockChain.blocks[newBlock.hash] = newBlock
  }

  // 汇总计算交易的 Hash 值
  /**
   * lesson5
   * 默克尔树实现
   * 默克尔树实现分三步
   * 1.计算每个transaction的hash值
   * 2.将交易的hash值作为树的叶子节点，作交易与hash值的映射（这里不做）
   * 3.将叶子两两合并，直至合并到一个根节点，并返回其值
   */
  combinedTransactionsHash() {
    var merkleTree = new MerkleTree(this.trxs)
    return merkleTree.getMerkleRoot()
  }
  // 添加交易到区块
  /**
   * lesson5 
   * 将交易添加到block块中存储交易数组中
   */
  addTransaction(trx) {
      //更新utxoPool
      var isUpdate = this.utxoPool.handleTransaction(trx,this.coinbaseBeneficiary)
      this.trxs.push(trx)
      //交易通过就能更新hash值
      if(isUpdate){
        this._setHash()
      }
  }

  // 添加签名校验逻辑
  isValidTransaction(transaction) {
    
  }
}

export default Block
