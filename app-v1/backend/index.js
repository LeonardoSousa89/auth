const db = require('./db/db.json')

const express = require('express')
const session = require('express-session')
const morgan  = require('morgan')

const port = 8081
var path   = require('path')  
const app  = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({secret:'5asd4asd1&%6asdas'}))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public',express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

app.post('/',(req, res)=>{
    if(  req.body.user == db.user 
        &&
         req.body.password == db.password){
         req.session.user = db.user
         res.render('logado')
        }else{
            res.render('index')
        }
     
})

app.get('/',(req, res)=>{
    if(req.session.user){
        res.render('logado')
    }else{
        res.render('index')
    }
    
})

app.listen(port, ()=> console.log(`ONLINE INTO PORT ${port}`))