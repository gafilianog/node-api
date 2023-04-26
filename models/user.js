const dbPool = require('../config/database');

const getAllUsers = () => {
    const query = `SELECT * FROM users;`;
    
    return dbPool.execute(query);
};

const getUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email='${email}';`;

    const [user] = await dbPool.execute(query);

    return user[0];
}

const createNewUser = (name, email, hashedPassword) => {
    const stmt = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`;
    
    return dbPool.execute(stmt);
};

const deleteUserByEmail = (email) => {
    const query = `DELETE FROM users WHERE email='${email}'`;

    return dbPool.execute(query);
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    createNewUser,
    deleteUserByEmail
};