import sha256 from 'crypto-js/sha256.js'

export const validateHash = () => {}

export const calcNonce = (block) => {
  console.log(`calc nonce of block ${block.index} `)
  const start = new Date().getTime()
  let calcTimes = 0
  while (!block.isValid()) {
    block.setNonce(sha256(new Date().getTime().toString()).toString())
    calcTimes++
  }
  //设置时间间隔，时间间隔过短会导致，nonce的值是相同的，以为实验是用时间戳作为随机值
  for(let i=0;i < 10000000;i++){}
  const end = new Date().getTime()
  console.log(
    `calc nonce cost ${(end - start) / 1000}s, try ${calcTimes} times`,
  )
  return block
}
