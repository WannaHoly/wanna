// Blockchain
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
}

export default Blockchain
