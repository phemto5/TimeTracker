const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const finale = require('finale-rest')

let app = express()
app.use(cors())
app.use(bodyParser.json())
// app.use((req, res, next) => {
//   next()
// })
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './Time.sqlite'
})
let Chunk = database.define('chunks', {
  start: Sequelize.STRING,
  stop: Sequelize.STRING,
  customer: Sequelize.STRING,
  body: Sequelize.TEXT,
  tag: Sequelize.STRING
})
finale.initialize({
  app: app,
  sequelize: database
})
// eslint-disable-next-line no-unused-vars
let userResource = finale.resource({
  model: Chunk,
  endpoints: ['/chunks', '/chunks/:id']
})
database
  .sync({force: true})
  .then(() => {
    app.listen(8081, () => {
      console.log('Listening on Localhost:8081')
    })
  })
