import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(publicKey, amount) {
    if(this.utxos.hasOwnProperty(publicKey)){
      this.utxos[publicKey].amount += amount 
    }else{
      this.utxos[publicKey] = new UTXO(amount)
    }
  }

  // 将当前 UXTO 的副本克隆
  clone() {
    return this.utxos
  }

    // 处理交易函数
    handleTransaction() {}

    // 验证交易合法性
    /**
     * 验证余额
     * 返回 bool
     */
    isValidTransaction() {}
}

export default UTXOPool
