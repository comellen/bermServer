const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_URL ||
    `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/berm`,
    {
        dialect: 'postgres',
    });

sequelize.authenticate().then(
    () => {
        console.log('Connected to berm database.');
    },
    (err) => {
        console.log(err, 'line 12 in db');
    }
);

module.exports = sequelize;