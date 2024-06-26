const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./db');
const Person = require('./models/Person');

const bodyParser = require('body-parser');
app.use(bodyParser.json());// storesdata in req.body 

app.get('/',function(req,res) {
    res.send('hello welcome to our hotel');
})

app.get('/menu',function(req,res) {
    res.send('hello this is our menu')
})
 
app.post('/persons', async (req,res)=> {
    try{
    const data = req.body // data body parser pe aara voh usse req.body me store kar rha hmme uske through milega
    // create the new person document using the mongoose model
    
    const newPerson = new Person(data);

   const response =  await newPerson.save()
   console.log('data saved')
   res.status(200).json(response)
    }
    catch (error){
        res.status(500).json({error: "internal server error"})
    }
})  

app.put('/:id',async (req,res) => {
    try{
        const PersonId = req.params.id;
        const updatedpersondata = req.body;
        
        const response = await Person.findByIdAndUpdate(PersonId,updatedpersondata,{
            new: true,
            runValidators:true,

        })
        if(!response) return res.status(404).json({err:'personnot found'})
        console.log('data updated')
        res.status(200).json(response);
    } catch(err) {
        res.status(500).json({err: "internal server error"})
    }
})

app.listen(3000, () => {
    console.log('listenig on port 3000');
})
