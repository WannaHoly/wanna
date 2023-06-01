import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos=utxos
  }

   // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中，若拥有相同地址，就在utxo的额度上增加相应的数值
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

  // 处理交易函数,lesson4,输入交易并对utxos进行更改
  handleTransaction(trx) {
    if(!this.isValidTransaction(trx.in,trx.amount)){
      return
    }
    //对输入进行扣除
    this.utxos[trx.in].amount -= trx.amount
    //给输出转账
    if(this.utxos[trx.out]){
      this.utxos[trx.out].amount += trx.amount
    }else{
      this.utxos[trx.out] = new UTXO(trx.amount)
    }
  }

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool 
   */
  isValidTransaction(send,balance) {
    if (this.utxos[send].amount >= balance){
      return true
    }
    return false
  }
}

export default UTXOPool
