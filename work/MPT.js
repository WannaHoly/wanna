class MPTNode {
    constructor(nodeType) {
        this.nodeType = nodeType    //leaf、branch、extension
        this.children = {}
        this.value = null
    }

    addChild(key, node) {
        this.children[key] = node
    }

    getChild(key) {
        return this.children[key]
    }

    removeChild(key) {
        if (key in this.children) {
            delete this.children[key]
        }
    }

    setValue(value) {
        this.value = value
    }

    getValue() {
        return this.value
    }
}
class Merkle_Patricia_Trie {
    constructor() {
        this.root = new MPTNode('branch')
    }

    get(key) {
        return this._find(this.root, key)
    }

    _find(node, key) {
        if (node.nodeType === 'leaf') {
            return node.getValue()
        } else if (node.nodeType === 'extension') {
            if (key.startsWith(node.value)) {
                const path = key.slice(node.value.length)
                return this._find(node.getChild(node.value[0]), path)
            }
        } else if (node.nodeType === 'branch') {
            if (key.length === 0) {
                return node.getValue()
            } else {
                const childNode = node.getChild(key[0])
                if (childNode) {
                    const path = key.slice(1)
                    return this._find(childNode, path)
                }
            }
        }

        return null
    }

    _findCommonPrefix(str1, str2) {
        let i = 0
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++
        }
        return str1.slice(0, i)
    }

    insert(key, value) {
        this.root = this._insert(this.root, key, value)
    }

    _insert(node, key, value) {
        if (node.nodeType === 'leaf') {
            // 叶子节点，更新值
            if (node.value === null) {
                node.setValue(value)
            }
        } else if (node.nodeType === 'extension') {
            // 扩展节点，存储一个shortcut
            const commonPrefix = this._findCommonPrefix(node.value, key)
            if (commonPrefix.length > 0) {
                const sharedPath = node.value.slice(0, commonPrefix.length)
                const remainingPath = node.value.slice(commonPrefix.length)
                const newBranchNode = new MPTNode('branch')
                const newExtensionNode = new MPTNode('extension')
                const newLeafNode = new MPTNode('leaf')
                newLeafNode.setValue(value)
                newExtensionNode.addChild(remainingPath[0], newLeafNode) // 将新的叶子节点作为子节点
                newExtensionNode.addChild(sharedPath, node) // 将原本的叶子节点作为子节点
                newBranchNode.addChild(sharedPath[0], newExtensionNode)
                node.setValue(commonPrefix)
                node.addChild(sharedPath[0], newBranchNode)
            } else {
                const newBranchNode = new MPTNode('branch')
                const newLeafNode = new MPTNode('leaf')
                newLeafNode.setValue(value)
                newBranchNode.addChild(key[0], newLeafNode)
                node.addChild(key[0], newBranchNode)
              }
            } else if (node.nodeType === 'branch') {
              // 分支节点
              if (key.length === 0) {
                node.setValue(value)
              } else {
                const childNode = node.getChild(key[0])
                if (childNode) {
                  const newChildNode = this._insert(childNode, key.slice(1), value)
                  node.addChild(key[0], newChildNode)
                } else {
                  const newLeafNode = new MPTNode('leaf')
                  newLeafNode.setValue(value)
                  node.addChild(key[0], newLeafNode)
                }
              }
            }

        return node
    }

    delete() {
        
    }

    update() {

    }

}

class account {
    constructor() {
        this.nonce = 0
        this.balance = 0
        this.codeHash = ''
        this.storageRoot = ''  
    }

    getBalance() {
        return this.balance
    }

    getNonce() {
        return this.nonce
    }

    // code...
}
// MPT树实例
const main =() => {
    let MPT = new Merkle_Patricia_Trie()
    let account1 = new account()
    account1.balance = 100
    account1.nonce = 10
    let account3 = new account()
    account3.balance = 103
    account3.nonce = 5
    let add1 = '8e5B16D3f309Ed62d4eA24eBB4111F1B34F51334'
    let add3 = '742d35Cc6634C0532925a3b844Bc454e4438f44e'
    MPT.insert(add1,account1)
    MPT.insert(add3,account3)
    console.log(MPT.get(add1))
    console.log(MPT.get(add3))
}
main()

