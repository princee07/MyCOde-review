const express = require('express');

const aiRoutes = require('./routes/ai.routes');

const cors = require('cors');

const app = require('express')

app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello world')
})

module.exports = app;