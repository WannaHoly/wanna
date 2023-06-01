import sha256 from 'crypto-js/sha256.js'

//lesson4完成功能,交易需要输入和输出，以及转账额，后面会添加矿工fee
class Transaction {
  constructor(miner,receiverPubKey,amount) {
    this.in = miner
    this.out = receiverPubKey
    this.amount = amount
    //交易的hash计算一般需要对数据结构进行序列化，这里直接将数据结构的属性加在一起
    this.hash = sha256(miner+receiverPubKey+amount).toString()
  }

  // 更新交易 hash
  _setHash() {

  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return sha256(this.in+this.out+this.amount).toString()
  }
}

export default Transaction