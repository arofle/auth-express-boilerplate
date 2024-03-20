import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3'
const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: './db/db.sqlite',
    dialectOptions: {
        mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX,
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default sequelize