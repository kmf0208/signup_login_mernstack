import OpenAI from "openai";

const openai = new OpenAI();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')



const app = express()

app.use(express.json())

app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017')

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("success")
            }else{
                res.json('the password incorrect')
            }
        }else{
            res.json("dont exist")
        }
    })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

// code to send request to openai api
// app.post('/api/generate-recipe', (req, res) => {
//     fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//     },
//     body: JSON.stringify({
//         prompt: req.body.prompt,
//         max_tokens: 60
//     })
//     })
//     .then(response => response.json())
//     .then(data => {
//         res.json(data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// })


app.listen(3001, ()=>{
    console.log('server is runing')
})