const SHA256 = require('crypto-js/sha256');
const Blockchain = require('../Blockchain/blockchain.js')
const Block = require('../Blockchain/block.js')
const socket = io.connect('http://localhost:3000')


document.getElementById('add').addEventListener('click', add)
document.getElementById('valid').addEventListener('click', valid)


let elections = new Blockchain()
var index
var electionsData


socket.on('init', function (data) {
	for(let i = 1; i < data.chain.length && data.chain.length > 1; i++) {
		elections.addBlock(new Block(data.chain[i].index, new Date(data.chain[i].timestamp), data.chain[i].data))
	}
	socket.emit('Blockchain valid?', elections.isChainValid());
})

socket.on('no valido', function (data) {
	alert('Sus datos son invalidos, recargue la pagina')
})

socket.on('valido', function (data) {
	index = elections.getLatestBlock().index
	electionsData = JSON.parse(elections.getLatestBlock().data)
	console.log(electionsData)
	document.getElementById('tablero').innerHTML = electionsData.map(element => {
		return `<button id="${Object.keys(element)[0]}">${Object.keys(element)[0]}</button>`
	})


	electionsData.map(element => {
		document.getElementById(Object.keys(element)[0]).addEventListener('click', function (e) {
			switch (Object.keys(element)[0]) {
				case 'candidato1':
					electionsData[0].candidato1 += 1
					break

				case 'candidato2':
					electionsData[1].candidato2 += 1
					break

				case 'candidato3':
					electionsData[2].candidato3 += 1
					break

				case 'blanco':
					electionsData[3].blanco += 1
					break 
			}
			elections.addBlock(new Block(index, new Date(), electionsData))
			console.log(elections.isChainValid())
			if (elections.isChainValid()) {
				socket.emit('nuevo voto', electionsData)
			}
			console.log(e.target.id)
		})
	})


})





function add() {
	elections.addBlock(new Block(index++, new Date("07/20/2017"), { amount: 4 }))
	index += index
	console.log('Blockchain valid? ' + elections.isChainValid())
	console.log(elections.chain[elections.chain.length-1])
}

function valid() {
	// elections.chain[1].data = { amount: 100 }
	console.log(elections)
	console.log('Blockchain valid? ' + elections.isChainValid())
}

