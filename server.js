const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const { request, response } = require('express')
const PORT = 8000


MongoClient.connect(process.env.DATABASE_URL, {useUnifiedTopology:true}) 
    .then(client => {
        console.log('Connected to DB')
        console.log(process.env.DATABASE_URL)
        const db = client.db('players-stats')
        const playerCollection = db.collection('players')

        app.set('view engine', 'ejs')
        app.use(cors())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(express.static('public'))

        app.get('/', (req, res) =>{
            playerCollection.find().toArray()          
                .then(results => {
                    res.render('index.ejs', {players: results})
                })
                .catch(error => console.error(error))
        })
        app.get('/api', (req, res) => {      
            playerCollection.find().toArray()
                .then(results => {
                    res.json(results)
                })          
            .catch(error => console.error(error))
        })
        app.get('/api/:name', (req, res) => {      
            const playerName = req.params.name.toLowerCase()     
            playerCollection.find().toArray()   
            .then(result => {
                const obj = {players: result}
                for(let i = 0; i < obj.players.length; i++){
                    if(obj.players[i].name.toLowerCase() === playerName){
                       res.json(JSON.stringify(obj.players[i]))
                    }                  
                }                
            })
            .catch(error => console.error(error))
        })
        
        app.get('/addplayers', (req, res) =>{
            playerCollection.find().toArray()
            .then(results => {
                res.render('addplayers.ejs', {players: results})
            })
            .catch(error => console.error(error))
        })
                
        app.post('/addplayers', (req, res) => {
            playerCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/addplayers')
                })
                .catch(error => console.error(error))
        })
                
        app.listen(process.env.PORT || PORT, _ =>{
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch(error => console.error(error))

