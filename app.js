require('dotenv').config();

const express = require('express');
const router = require('./routes/user');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(router);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
})