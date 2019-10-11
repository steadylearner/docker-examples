const express = require('express')
const chalk = require("chalk");

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

const blue = chalk.blue
const target = blue(`http://localhost:${port}`)

app.listen(port, () => console.log(`Express Server ready at ${target}`))
