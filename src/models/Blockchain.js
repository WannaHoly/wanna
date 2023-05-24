import UTXOPool from './UTXOPool.js'

class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name = name
    this.genesis = null
    this.blocks = {}
  }

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
  longestChain() {
      //初始化一个最长链数组
      var longestChain = []
      //最长链链长度的值
      var len = 0
      //遍历区块链的映射
      for (var key in this.blocks) {
        //拿到区块，用一个变量暂存它
        var tmpBlock = this.blocks[key]
        //如果得到区块链索引大于链的长度就更新最长链
        if (tmpBlock.index > len){
          len = tmpBlock.index
          //更新最长链，将区块链添加到最长链数组中
          for(var key in tmpBlock.blocks){
            longestChain.push(tmpBlock.blocks[key])
          }
            //添加块本身
          longestChain.push(tmpBlock)
        }
      }
        return longestChain
  }

  // 判断当前区块链是否包含
  containsBlock(block) {
    // 添加判断方法
    if(this.blocks.hasOwnProperty(block.hash)){
      return true
    } 
    return false
  }

  // 获得区块高度最高的区块
  maxHeightBlock() {
    // return Block
  }

  // 添加区块
  /*
  * 添加区块之前要进行验证。
  * 若不通过，就跳出该函数
  * 若通过，就添加该块，并在下一步中进行验证，验证通过就跳出该函数
  */
  _addBlock(block) {
    if (!block.isValid()) return
    this.blocks[block.hash] = block
    if (this.containsBlock(block)) return

    // 添加 UTXO 快照与更新的相关逻辑
  }

    //获取父区块的utxoPool结果
    getPreBlockUTXO(preHash) {
      if(preHash == "root"){
        return new UTXOPool(new Map())
      }
      return this.blocks[preHash].utxoPool
    }
  
    //根据coinBase交易更新UTXOPOOL的状态,即添加一个矿工的utxo
    coinBaseTransaction(preHash,coinbaseBeneficiary){
      //用父区块的utxoPool来更新  
      let Pool = this.getPreBlockUTXO(preHash)
   
      Pool.addUTXO(coinbaseBeneficiary,12.5)
      return Pool
    }
}

export default Blockchain
