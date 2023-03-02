const dbPool = require('../config/database');

const getAllUsers = () => {
    const query = `SELECT * FROM users;`;
    
    return dbPool.execute(query);
};

const getUserByName = (name) => {
    const query = `SELECT * FROM users WHERE name='${name}';`;

    return dbPool.execute(query);
}

const createNewUser = (body) => {
    const stmt = `INSERT INTO users VALUES (0, ${body.name}, ${body.password})`;
    
    return dbPool.execute(stmt);
};

module.exports = {
    getAllUsers,
    getUserByName
};