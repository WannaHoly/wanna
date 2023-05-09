class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
  chainName: 区块链
  hash：父区块hash值
  index：区块序号
  hash：本区块hash值

  */
  constructor(blockChain,preHash,index,hash) {
    this.blockChain = blockChain
    this.preHash = preHash
    this.index = index
    this.hash = hash
  }
}

export default Block
