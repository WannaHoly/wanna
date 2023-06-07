/**
 * 本实验，实现了存放数字和字母的功能
 * 进一步进行思考：1.对字典树的优化。2.提高字典树的查询效率
 * 使用以太坊的数据结构，将节点分为三类：有扩展结点、叶子节点、分支节点
 */

class Trie{
    /**
     * 设置三个参数
     * value，存放当前字母
     * child，存放下一个节点的字母或数字，由于根节点是空的，所以它无需有字母
     * flag，代表一个节点是否结束
     */
    constructor(value){
        this.value = value
        //前0-26是字母存放的位置，27-35是数字
        this.child = []
        this.flag = false
    }

    addWord(word){
        var strLen = word.length
        var child = this.child
        for(var i = 0;i < strLen;i++){
            var char = word.charAt(i)
            var position = this.getNumOrAlp(char)
            //如果子节点没有该字母，则创建一个子节点
            if(typeof(child[position]) === "undefined"){
                var newChild = new Trie(char)
                if(i == strLen-1){
                    newChild.flag = true
                }
                child[position] = newChild
            }else{
                //如果节点存在，检查它是不是叶子节点.它可能之前是叶子节点，但在加入新单词后它成为节点
                if(i < strLen - 1 && !child[position].flag){
                    child[position].flag = false
                }
            }            
            //更新下一个子节点
            child = child[position].child
        }

    }

    deleteWord(word){
        var strLen = word.length
        var child = this.child
        var trie = {}
        var stack = []
        //将节点入栈
        for(var i = 0;i < strLen;i++){
            var char = word.charAt(i)
            var position = this.getNumOrAlp(char)
            trie = child[position]
            //字符存在就继续下一步，不存在就报该单词不存在
            if(!trie){
                console.log("树中未有该单词")
                return
            }
            stack.push(trie)
            child = child[position].child
        }
        //删除操作
        while(stack.length > 1){
            var count = 0
            var tmp = stack.pop()
            //如果当前字符是叶子且他的父节点只有这一个子节点，就删除该节点，并更新父节点成为叶子节点
            if(tmp.flag == true && stack[stack.length-1].child.some((element) => {
                if(element !== undefined){
                    count++
                }
                return count == 1
            })){
                //删除
                stack[stack.length-1].child[this.getNumOrAlp(tmp.value)] = undefined
                //更新
                stack[stack.length-1].flag = false
            }
        }
    }

    //判断是数字还是字母
    getNumOrAlp(char){
        var position = 0
            if(char.codePointAt() - 'a'.codePointAt() < 0){
                position = char.codePointAt() - '1'.codePointAt() + 27
            }else{
                position = char.codePointAt() - 'a'.codePointAt() 
            }
            return position
    }

    makeTrieByStrArr(strArr){
        for(var i = 0;i < strArr.length;i++){
            this.addWord(strArr[i])
        }
    }

}

export const preOrder = (trie) =>{
    console.log(trie.value)
    if(trie){
        for(var i = 0;i < 36;i++){
            if(typeof(trie.child[i]) !== "undefined"){
                preOrder(trie.child[i])   
            }
        }
    }
    
} 


export default Trie