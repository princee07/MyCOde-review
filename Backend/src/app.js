const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 
        'https://allcode-review.netlify.app',
         'https://my-c-ode-review.vercel.app'
    ],
}))


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app