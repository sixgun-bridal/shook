const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const pg = require('./db/knex')
const port = process.env.PORT || 3000

const linkQuery = require('./db/link-query')

app.set('view engine', 'hbs')

app.use('/', express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
