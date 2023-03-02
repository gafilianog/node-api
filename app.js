require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
// const mysql = require('mysql2');
// const dbPool = require('./config/database');
const router = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use(router);

const PORT = process.env.PORT

// app.post('/register', async (req, res) => {
//     const name = req.body.name;
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     dbPool.getConnection(async (err, connection) => {
//         if (err) throw (err);

//         console.log("DB Connection Successful: " + connection.threadId);
    
//         const sqlSearch = "SELECT * FROM users WHERE name=?";
//         const searchQuery = mysql.format(sqlSearch, [name]);

//         const sqlInsert = "INSERT INTO users VALUES(0, ?, ?)";
//         const insertQuery = mysql.format(sqlInsert, [name, hashedPassword]);

//         await connection.query(searchQuery, async (err, result) => {
//             if (err) throw (err);

//             console.log("--------> Search results");
//             console.log(result.length);

//             if (result.length != 0) {
//                 connection.release();
//                 console.log("--------> User already exists");
//                 res.sendStatus(409);
//             } else {
//                 await connection.query(insertQuery, (err, result) => {
//                     connection.release();

//                     if (err) throw (err);

//                     console.log("--------> Create new user");
//                     console.log(result.insertId);
//                     res.sendStatus(201);
//                 });
//             }
//         });
//     });
// });

// app.post('/login', (req, res) => {
//     const name = req.body.name;
//     const password = req.body.password;

//     dbPool.getConnection(async (err, connection) => {
//         if (err) throw (err);

//         const sqlSearch = "SELECT * FROM users WHERE name=?";
//         const searchQuery = mysql.format(sqlSearch, [name]);

//         await connection.query(searchQuery, async (err, result) => {
//             connection.release();

//             if (err) throw (err);

//             if (result.length == 0) {
//                 console.log("User does not exists");
//                 res.sendStatus(404);
//             } else {
//                 const hashedPassword = result[0].password

//                 if (await bcrypt.compare(password, hashedPassword)) {
//                     console.log("--------> Login successful");
//                     res.send(`${name} is logged in`);
//                 } else {
//                     console.log("--------> Password incorrect");
//                     res.send("Password incorrect");
//                 }
//             }
//         });
//     });
// });

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
})