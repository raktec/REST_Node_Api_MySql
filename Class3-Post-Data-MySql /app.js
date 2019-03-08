// load our server using express spmehow....
const express = require('express');
const app = express();
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static('./public'))

app.use(morgan('short'))

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'helloworld'
    })
}

app.post('/create_user',(req,res) =>{
    console.log("Trying to create new user");
    const first_name = req.body.firstname
    const last_name = req.body.lastname
    const queryString = 'INSERT INTO users(fname,lname) VALUES(?,?)'
    //console.log("First Name: " + first_name + " " + "Last Name: " + last_name);
    getConnection().query(queryString, [first_name, last_name], (err, results, fields)=>{
        if (err) {
            console.log("Faild to insert user:" + err);
            res.sendStatus(500)
            res.end()
           
        }
        console.log("Insert a new user with id :"+ results.insertId);
        res.json(results)
        res.end()
    })
   
})



app.get('/user/:id', (req,res) =>{
    console.log("fatching user with id :"+ req.params.id);
    const connection = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * from users where id = ?"
    connection.query(queryString, [userId],(err, results, fields) =>{
       if(err){
           console.log("Faild to query for users:"+ err);
           res.sendStatus(500)
           res.end()
            return
       }


        // custon  return user data
        const users = rows.map((row) =>{
            return { FirstName: row.fname, LastName: row.lname }
        })
        console.log("i think we get user successfully");
        res.json(users)

    //    // default return user data
    //     console.log("i think we get user successfully");
    //     res.json(rows)
    })
   // res.end()
})

app.get("/",(req,res) =>{
    console.log("Responding to root route");
    res.send("Hello Root ...");
})


app.get('/users', (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * from users"
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Faild to query for users:" + err);
            res.sendStatus(500)
            res.end()
            return
        }


       
        // default return user data
            console.log("i think we get user successfully");
            res.json(rows)
    })
    // res.end()
})

//localhost 3003
app.listen(3003,()=>{
    console.log("Server is up ans listening on 3003 ")
});