import sha256 from 'crypto-js/sha256.js';
import MerkleTree from "./MerkleTree.js";

//模拟交易
class trx{
    constructor(hash){
        this.hash = hash
    }
}

const main = () => {
   //测试，构建排序好的交易
   var trx1 = new trx(sha256("a").toString())
   var trx2 = new trx(sha256("b").toString())
   var trx3 = new trx(sha256("c").toString())
   var trx4 = new trx(sha256("d").toString())
   var trx5 = new trx(sha256("e").toString())
   var leaves = new Array()
   leaves.push(trx1)
   leaves.push(trx2)
   leaves.push(trx3)
   leaves.push(trx4)
   leaves.push(trx5)
   console.log(leaves)

   //手动创建merkle各节点
   var trx12 = new trx(sha256(trx1+trx2))
   var trx34 = new trx(sha256(trx3+trx4))
   var trx55 = new trx(sha256(trx5+trx5))
   var trx1234 = new trx(sha256(trx12+trx34))
   var trx5555 = new trx(sha256(trx55+trx55))
   var trx12345555 = new trx(sha256(trx1234+trx5555))

    var merkleTree = new MerkleTree(leaves)
    console.log(merkleTree.tree)

    //测试树中对应的hash值是否与交易hash相同
    console.assert(
        trx1234.hash != merkleTree.tree[8],
        `hash不相同`,
      )
}

main()
