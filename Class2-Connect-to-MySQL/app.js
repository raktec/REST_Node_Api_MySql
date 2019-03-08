// load our server using express spmehow....
const express = require('express');
const app = express();
const morgan = require('morgan')
const mysql = require('mysql')


app.use(morgan('short'))

app.get('/user/:id', (req,res) =>{
    console.log("fatching user with id :"+ req.params.id);
    const connection = mysql.createConnection({
        host: 'localhost',
        user:'root',
        password:'password',
        database:'helloworld'
    })
    const userId = req.params.id
    const queryString = "SELECT * from users where id = ?"
    connection.query(queryString, [userId],(err, rows, fields) =>{
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