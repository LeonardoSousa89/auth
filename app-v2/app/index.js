//carregando arquivos
const express = require('express')
const morgan  = require('morgan')
const session = require('express-session')
const db   = require('./db/db.json')

//configurações 
const port = 8081
var path   = require('path')  

var app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(session({secret:'5asd4asd1&%6asdas'}))

app.engine('html',require('ejs').renderFile)
app.set('view engine','html')
app.set('views', path.join(__dirname, '/views'))

app.listen(port,()=>console.log(`online into port ${port}`))

//lógica da aplicação/regras de negócio
app.post('/',async(req,res)=>{
    if(req.body.user === db.user && req.body.pass === db.pass){
        req.session.user = db.user
        res.render('page')
    }else{
        res.render('unauthorized')
    }
})

app.get('/', async(req,res)=>{
    res.render('login')
})