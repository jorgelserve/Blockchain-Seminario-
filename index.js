const express = require('express')
const app = express()


app.get("/:x", function (req, res){
  console.log(`someone has entered the ${req.params.x} route`);
  res.status(200).send(req.params.x);
})

app.listen(3000, function () {
  console.log('escuchando en el puerto 3000')
})