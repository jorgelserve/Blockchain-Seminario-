const express = require('express')
const app = express()
const helmet = require('helmet')
const server = require('http').Server(app)
const io = require('socket.io')(server)
//--------------------------------------------------------------
const SHA256 = require('crypto-js/sha256');
const Blockchain = require('../Blockchain/blockchain.js')
const Block = require('../Blockchain/block.js')
//--------------------------------------------------------------
app.set('view engine', 'pug')

app.use(helmet())
app.use(helmet.noCache())
app.use(express.static('./public'))




var elections = new Blockchain()
var index = 0
// console.log(JSON.stringify(elections))
console.log(`\nBlockchain valid? ${elections.isChainValid()}`)

app.get('/', function (req, res){
  res.render('index')
})


io.on('connection', function (socket) {
	socket.emit('init', elections)
	socket.on('Blockchain valid?', function (data) {
		if (data == elections.isChainValid()) {
			console.log('Puesto agregado')
			socket.emit('valido') 
		} else {
			console.log('Puesto invalido')
			socket.emit('no valido') 
		}
	})
})


var port = process.env.PORT || 3000

server.listen(port, () => {
	console.log(`escuchando en el puerto ${port}`)
	console.log(`\thttp://localhost:${port}`)
	console.log(`\nBlockchain valid? ${elections.isChainValid()}`)
})
