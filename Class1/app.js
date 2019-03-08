// load our server using express spmehow....
const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan('short'))

app.get("/",(req,res) =>{
    console.log("Responding to root route");
    res.send("Hello Root ...");
})


app.get("/users", (req,res) =>{
    const user1 = {"firstname":"Rakesh","lastname":"Sherma"}
    const user2 = { "firstname": "Manish", "lastname": "Sherma" }
    const user3 = { "firstname": "Amit", "lastname": "Sherma" }

    res.send([user1, user2, user3])
})

//localhost 3003
app.listen(3003,()=>{
    console.log("Server is up ans listening on 3003 ")
});