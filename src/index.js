const SHA256 = require('crypto-js/sha256');
const Blockchain = require('../Blockchain/blockchain.js')
const Block = require('../Blockchain/block.js')
const socket = io.connect('https://javascript-blockchain.herokuapp.com')


document.getElementById('valid').addEventListener('click', valid)
document.getElementById('invalid').addEventListener('click', invalid)


let elections = new Blockchain()
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
	electionsData = JSON.parse(elections.getLatestBlock().data)
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
			elections.addBlock(new Block(elections.getLatestBlock().index+1, new Date(), electionsData))
			show()
			console.log(elections.isChainValid())
			console.log(JSON.parse(elections.getLatestBlock().data))
		})
	})
})



function valid() {
	if (elections.isChainValid() == true) {
		alert('La cadena de bloques es valida')
	} else {
		alert('La cadena de bloques NO es valida')
	}
}

function invalid() {
	elections.chain[1].data = {"jorge luis serna estuvo aca": null}
}

function show() {
	document.getElementById('data').innerHTML = JSON.stringify(elections.getLatestBlock().data, null, 4)
}

