import CryptoJS from "crypto-js";
// 构造一个叶子节点
function createLeafNode(data) {
  var hash = CryptoJS.SHA256(data).toString();
  return {
    data: data,
    hash: hash,
    isLeaf: true,
  };
}

// 合并两个节点
function mergeNodes(left, right) {
  var data = left.hash + right.hash;
  var hash = CryptoJS.SHA256(data).toString();
  return {
    left: left,
    right: right,
    hash: hash,
    isLeaf: false,
  };
}

// 递归地合并节点，构造默克尔树
function buildLeaf(data) {
  if (data.length == 1) {
    return createLeafNode(data[0]);
  }

  var nodes = [];
  for (var i = 0; i < data.length; i += 2) {
    var left = createLeafNode(data[i]);
    var right = (i + 1 == data.length) ? null : createLeafNode(data[i+1]);
    var node = mergeNodes(left, right);
    nodes.push(node);
  }

  return nodes;
}
//合并不是叶子结点的节点，构造树
function buildTree(data) {
    if (data.length == 1){
        return data[0]
    }
    var nodes = []
    for (var i = 0; i < data.length; i += 2) {
        var left = data[i]
        var right = (i + 1 == data.length) ? null : data[i+1];
        var node = mergeNodes(left,right)
        nodes.push(node)
    }
    return buildTree(nodes)
}

// 使用默克尔树验证数据
function verifyData(tree, data) {
  var node = tree;
  for (var i = 0; i < data.length; i++) {
    var leaf = createLeafNode(data[i]);
    var resultnode=match(node,leaf)
    if (resultnode == null) {
        return false
    }
  }
  return true
}
function match(tree,leaf){
    if (tree != null){
        if(tree.hash == leaf.hash){
            return tree;
        }
    }
    var node = null
    if (tree.left != null) {
        node = match(tree.left,leaf)
        if(node != null){
            return node
        }
    }
    if(tree.right != null) {
        node = match(tree.right,leaf)
        if(node != null){
            return node
        }
    }
    return node
}

// 示例
var data = ["foo", "bar", "baz", "qux"];
var tree = buildTree(buildLeaf(data));
console.log(tree)
console.log(tree.hash); // 输出根节点的哈希值
console.log(verifyData(tree, data)); // 输出 true