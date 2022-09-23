const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const path = require('path')

// import models
const mcqs = require('./models/mcqs')
const short = require('./models/short')
// const shorttype = require('./models/short')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))



const port = 3000 || process.env.PORT

// mongoose settings

mongoose.connect('mongodb://localhost:27017/quizapp',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error',console.error.bind(console, 'connection error::'))
db.once('open',()=>{
    console.log('database conneted successfully')
})

//  all the home

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/mcqhome',async (req,res) => {
    const mcqdb = await mcqs.find({})
    res.render('show/mcq', {mcqdb})
})
app.get('/shorthome', async(req,res)=>{
    const shortdb = await short.find({})
    res.render('show/short', {shortdb})
})

// create page

app.get('/mcqcreate', (req,res) =>{
    res.render('create/mcq')
})
app.get('/shortcreate', (req,res)=>{
    res.render('create/short')
})

//get request update the questions

app.get('/mcqupdate/:id/edit', async(req,res)=>{
    const mcqupdate = await mcqs.findById(req.params.id)
    res.render('update/mcq', {mcqupdate})
})
app.get('/shortupdate/:id/edit', async(req,res) =>{
    const shortupdate = await short.findById(req.params.id)
    res.render('update/short', {shortupdate})
})

// put request update the questions

app.put('/mcqupdate/:id', async(req,res) =>{
    const {id} = req.params
    const mcqudpate = await mcqs.findByIdAndUpdate(id,{...req.body})
    res.redirect('/mcqhome')
})

app.put('/shortupdate/:id', async(req,res)=> {
    const {id} = req.params
    const shortupdate = await short.findByIdAndUpdate(id,{...req.body})
    res.redirect('/shorthome')
})

// delete question

app.delete('/mcqdelete/:id', async(req,res) => {
    const {id} = req.params
    const mcqdelete = await mcqs.findByIdAndDelete(id)
    res.redirect('/mcqhome')
})

app.delete('/shortdelete/:id', async(req,res)=>{
    const {id} = req.params
    const shortdelete = await short.findByIdAndDelete(id)
    res.redirect('/shorthome')
})

// checking which page going 
app.post('/check',async(req,res)=>{
    if(req.body.type==='short'){
        res.redirect('/shorthome')
    }
    else if(req.body.type==='mcq'){
        const mcq = await mcqs.find({})

        res.redirect('/mcqhome',200,  {mcq})
    }
    
})

// mcq value
app.post('/mcqcreate', async (req,res) =>{

    const mcqmodel = new mcqs(req.body)
    await mcqmodel.save()
    res.redirect('/mcqhome')
})

app.post('/shortcreate', async(req,res)=>{
    const shortmodel = new short(req.body)
    await shortmodel.save()
    res.redirect('/shorthome')
})

app.listen(port, ()=>{
    console.log(`your app is running  on http://localhost:${port}`)
})