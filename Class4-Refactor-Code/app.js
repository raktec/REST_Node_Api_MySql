// load our server using express spmehow....
const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser= require('body-parser')
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static('./public'))

app.use(morgan('short'))

const router = require('./routes/user.js')
app.use(router)



app.get("/",(req,res) =>{
    console.log("Responding to root route");
    res.send("Hello Root ...");
})




//localhost 3003
app.listen(PORT,()=>{
    console.log("Server is up ans listening on "+PORT)
});