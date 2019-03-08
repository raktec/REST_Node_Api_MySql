// will contan all user related route
const express = require('express');
const router = express.Router()
const pool = require('../evn/sqldbConnection')

router.get('/message',(req, res) =>{
    console.log(" message from custom user routes ");
    res.end()
})

router.post('/create_user', (req, res) => {
    console.log("Trying to create new user");
    const first_name = req.body.firstname
    const last_name = req.body.lastname
    const queryString = 'INSERT INTO users(fname,lname) VALUES(?,?)'
    //console.log("First Name: " + first_name + " " + "Last Name: " + last_name);
    getConnection().query(queryString, [first_name, last_name], (err, results, fields) => {
        if (err) {
            console.log("Faild to insert user:" + err);
            res.sendStatus(500)
            res.end()

        }
        console.log("Insert a new user with id :" + results.insertId);
        res.json(results)
        res.end()
    })

})


router.get('/user/:id', (req, res) => {
    console.log("fatching user with id :" + req.params.id);
    const connection = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * from users where id = ?"
    connection.query(queryString, [userId], (err, results, fields) => {
        if (err) {
            console.log("Faild to query for users:" + err);
            res.sendStatus(500)
            res.end()
            return
        }
        // custon  return user data
        const users = results.map((row) => {
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

router.get('/users', (req, res) => {
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
        console.log("we get all users successfully");
        res.json(rows)
    })
    // res.end()
})



function getConnection() {
    return pool
}



module.exports = router