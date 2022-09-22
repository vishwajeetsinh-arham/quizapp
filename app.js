const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const mcqmodel = require('./models/mcqmodel.js')
const MCQ = require('./models/mcqmodel.js')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))

const port = 3000

// mongoose settings

const Quizzapp = require('./models/quiz.js')
mongoose.connect('mongodb://localhost:27017/quizapp',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error',console.error.bind(console, 'connection error::'))
db.once('open',()=>{
    console.log('database conneted successfully')
})

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/mcqhome',async (req,res) => {
    const mcqmo = await mcqmodel.find({})
    res.render('show/mcq', {mcqmo})
})

app.post('/check',async(req,res)=>{
    if(req.body.type==='short'){
        res.render('create/short')
    }
    else if(req.body.type==='mcq'){
        res.render('create/mcq')
    }
    
})

// mcq value
app.post('/mcqcreate', async (req,res) =>{

    const mcqmodel = new MCQ(req.body)
    await mcqmodel.save()
})

app.listen(port, ()=>{
    console.log(`your app is running  on http://localhost:${port}`)
})