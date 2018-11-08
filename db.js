const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME, process.env.USERNAME, process.env.PASS, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    () => {
        console.log('Connected to berm database.');
    },
    (err) => {
        console.log(err);
    }
);

module.exports = sequelize;