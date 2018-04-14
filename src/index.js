const SHA256 = require('crypto-js/sha256')
const Block = require('./block')
const Blockchain = require('./blockchain')


document.getElementById('add').addEventListener('click', add)
document.getElementById('valid').addEventListener('click', valid)


let jorgecoin = new Blockchain()
var index = 0

function add() {
	jorgecoin.addBlock(new Block(index++, "20/07/2017", { amount: 4 }))
	index += index
	console.log('Blockchain valid? ' + jorgecoin.isChainValid())
	console.log(jorgecoin.chain[jorgecoin.chain.length-1])
}

function valid() {
	jorgecoin.chain[1].data = { amount: 100 }
	console.log('Blockchain valid? ' + jorgecoin.isChainValid())
}