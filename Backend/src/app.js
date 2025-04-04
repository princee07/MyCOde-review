const express = require('express');
const aiRoutes = require('./routes/ai.routes')


const app = express()
const cors = require('cors')
app.use(cors({
    origin: ['https://reviewcode.netlify.app', 'https://my-c-ode-review.vercel.app'],
  }));


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app