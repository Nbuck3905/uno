const databaseSettings = require('./knexfile.js').development
const knex = require('knex')(databaseSettings)
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.listen(3000)

/////// users

app.get('/users', (req, res) => {
    async function getUsers(){
        let users = await knex('users').select()
        res.send(users)
    }
    getUsers()
})

app.get('/users/:id', (req, res) => {
    async function getUser(){
        let user = await knex('users').where({id: req.params.id}).select()
        res.send(user)
    }
    getUser()
})

app.post('/users', (req, res) => {
    async function postUser(){
        let [ id ] = await knex('users').insert(req.body)
        res.send(JSON.stringify({ ...req.body, id }))
    }
    postUser()
})

app.patch('/users/:id', (req, res) => {
    async function patchUser(){
        let user = await knex('users').where({id: req.params.id}).update(req.body)
        res.send(user.json())
    }
    patchUser()
})

app.delete('/users/:id', (req, res) => {
    async function deleteUser(){
        let user = await knex('users').where({id: req.params.id}).del()
        res.send(console.log(`${user} deleted`))
    }
    deleteUser()
})



////// hands

app.get('/hands', (req, res) => {
    async function getHands(){
        let hands = await knex('hands').select()
        res.send(hands)
    }
    getHands()
})

app.get('/hands/:id', (req, res) => {
    async function getHand(){
        let hand = await knex('users').where({id: req.params.id}).select()
        res.send(hand)
    }
    getHand()
})

app.post('/hands', (req, res) => {
    async function postHand(){
        let hand = await knex('users').insert(req.body)
        res.send(JSON.stringify(hand.json()))
    }
    postHand()
})



////// games

app.get('/games', (req, res) => {
    async function getGames(){
        let games = await knex('games').select()
        res.send(games)
    }
    getGames()
})

app.get('/games/:id', (req, res) => {
    async function getGame(){
        let game = await knex('games').where({id: req.params.id}).select()
        res.send(game)
    }
    getGame()
})

app.post('/games', (req, res) => {
    async function postGame(){
        let game = await knex('games').insert(req.body)
        res.send(JSON.stringify(game.json()))
    }
    postGame()
})

app.patch('/games/:id', (req, res) => {
    async function patchGame(){
        let game = await knex('games').where({id: req.params.id}).update(req.body)
        res.send(game.json())
    }
    patchGame()
})

app.delete('/games/:id', (req, res) => {
    async function deleteGame(){
        let game = await knex('games').where({id: req.params.id}).del()
        res.send(console.log(`${game} deleted`))
    }
    deleteGame()
})