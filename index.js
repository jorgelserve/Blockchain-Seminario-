const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hola mundo</h1>')        
})

app.listen(3000, function () {
  console.log('escuchando en el puerto 3000')
})