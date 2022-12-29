import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { generatequesions, getRank } from './helper.js';

config();

const PORT = process.env.PORT || 5000

const app = express();

app.use(json());
app.use(cors())


//endpoint that return randomly 10 quesions
app.get('/quesions',(req,res)=>{
    
    let quesions = generatequesions();
    res.json(quesions);
})

//enpoint that return the rank
app.post('/rank/',(req,res)=>{

    let score = req.body.score; // a number from 0 to 10 (number of correct answer)
    let rank = getRank(score);
    res.json(rank);
})


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`) 
})