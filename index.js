const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', function (req, res){
  res.send('Hola mundo')
})


var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`escuchando en el puerto ${port}`)
  console.log(`http://localhost:${port}`)
})