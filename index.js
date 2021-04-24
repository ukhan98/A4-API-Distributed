
// ----------------------------------
// mongo setup
// ----------------------------------
const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://dbUser:0000@clustera4.td2ic.mongodb.net/college?retryWrites=true&w=majority"

const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// mongoose.connect(mongoURL, connectionOptions).then(
//     () => {
//         console.log("Connected successfully to your database")
//     }
// ).catch(
//     (err) => {
//         console.log("Error connecting")
//         console.log(err)
//     }
// )
// add your table schemas

const Schema = mongoose.Schema

const AnimalSchema = new Schema({
   name:String,
   rarity:String,
   description:String,
   goldPerTurn:Number 
})

const Animal = mongoose.model("animals_table", AnimalSchema)


// ----------------------------------
// express setup
// ----------------------------------
const express = require("express");
const app = express();
app.use(express.json())
const HTTP_PORT = process.env.PORT || 8080;

// ----------------------------------
// Url endpoints
// ----------------------------------

//Get 
app.get("/", (req, res) => { 
    res.send("please search /api/animals too see the list of animals")
})

// GET ALL
app.get("/api/animals", (req, res) => {
    // 1. search the database for students and return them
    Animal.find().exec().then(
        (results) => {
            console.log(results)
            res.status(200)
            res.send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting animals from database.")
        }
    )
    
})


// GET ONE
app.get("/api/animals/:name", (req,res) => {
    Animal.find({'name':req.params.name}).exec().then(
      (specificResult) => {
          console.log(specificResult)
          res.status(200)
          res.send(specificResult) }
    ).catch(
      () => {
          console.log("Item not found")
          res.send("Item not found")
      }

    )    
})


const a1 = Animal({name:"NewInsertAnimal", rarity:"some Rare", description:"Big and Black", goldPerTurn:1})

// INSERT 
app.post("/api/animals", (req, res) => {
    a1.save().then(
        (insertedResults) => {
            console.log("Item was inserted")
            res.status(201)
            res.send(insertedResults)
        }
    ).catch(
        (err) => {
            console.log("Error")
            console.log(err)
            
        }
    )
    //res.status(501).send("Not implemented")
})


// UPDATE BY ID
app.put("/api/animals", (req,res) => {
    
    
            console.log("the method to update will implemendted in the future")
            res.status(501)
            res.send("the method to update will implemendted in the future")
     
})

// DELETE BY ID
app.delete("/api/animals/:name", (req,res) => {
    Animal.findOneAndDelete({'name':req.params.name}).exec().then(
        () => {
            console.log("Item was deleted")
            res.status(200)
            res.send("Item was deleted") }

    ).catch(
        () => {
        console.log("Item was not found")
        res.send("Item was not found") }
    )
  })





// ----------------------------------
// start server
// ----------------------------------
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}


// 1. connect to the databas
// 2. AFTER you successfully connect, that you start he expres server
mongoose.connect(mongoURL, connectionOptions).then(
    () => {
         console.log("Connection success")
         app.listen(HTTP_PORT, onHttpStart); 
    }
 ).catch(
    (err) => {
        console.log("Error connecting to database")
        console.log(err)
    }
)
