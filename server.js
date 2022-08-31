const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

// create connection to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth : true
});

// connect
db.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log('MySql Connected...');
        
    }
    
})

// Create Database
app.get('/create-database',(req,res) => {
    const sql = "CREATE DATABASE test"
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send('Database created...');
        }
    })
})


// Create Table
app.get('/create-table',(req,res) => {
    const sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))"
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send('Table created...');
        }
    })
})

// Insert Data
app.get('/insert-data',(req,res) => {
    const {title, body} = req.query;

    const post = {title, body};

    if(!title || !body){
        return res.send('Please send title and body');
    }

    const sql = "INSERT INTO posts SET ?";
    db.query(sql, post, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send('Data inserted...');
        }
    })

})

// get data
app.get('/get-posts',(req,res) => {
    const sql = "SELECT * FROM posts";
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.json(result);
        }
    })
})

// get single post
app.get('/get-post/:id',(req,res) => {
    const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.json(result);
        }
    })
})

// update post
app.get('/update-post/:id',(req,res) => {
    const {title, body} = req.query;

    const post = {title, body};

    if(!title || !body){
        return res.send('Please send title and body');
    }

    const sql = `UPDATE posts SET ? WHERE id = ${req.params.id}`;
    db.query(sql, post, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send('Data updated...');
        }
    })
})

// delete post
app.get('/delete-post/:id',(req,res) => {
    const sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send('Data deleted...');
        }
    })
} )

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})