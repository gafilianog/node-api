const dbPool = require('../config/database');

const getAllUsers = () => {
    const query = `SELECT * FROM users;`;
    
    return dbPool.execute(query);
};

const getUserByName = (name) => {
    const query = `SELECT * FROM users WHERE name='${name}';`;

    return dbPool.execute(query);
}

const createNewUser = (name, hashedPassword) => {
    const stmt = `INSERT INTO users VALUES (0, '${name}', '${hashedPassword}')`;
    
    return dbPool.execute(stmt);
};

module.exports = {
    getAllUsers,
    getUserByName,
    createNewUser
};