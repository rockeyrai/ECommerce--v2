const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', (req, res) => {
  res.send(['Ram','Sham','Hari'])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})