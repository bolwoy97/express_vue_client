const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'dist')))
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));


if(process.env.NODE_ENV === 'production'){
    process.env.API_URL = 'http://localhost:3000';
}else{
    process.env.API_URL = 'http://localhost:3000';
}


const PORT = process.env.PORT || 8080

async function start() { 
  try {
    app.listen(PORT, () => {
      console.log(`Server started on  http://localhost:${PORT} ...`)
    })
  } catch (e) {
    console.log('Server start Error: '+e)
  }
}

start()
