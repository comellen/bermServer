module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ride', {
        trail: DataTypes.STRING,
        location: DataTypes.STRING,
        bike: DataTypes.STRING,
        time: DataTypes.STRING,
        notes: DataTypes.TEXT,
        date: DataTypes.STRING,
        owner: DataTypes.INTEGER
    });
};