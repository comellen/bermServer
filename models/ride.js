module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ride', {
        trail: DataTypes.STRING,
        location: DataTypes.STRING,
        bike: DataTypes.STRING,
        time: DataTypes.TIME,
        notes: DataTypes.TEXT,
        date: DataTypes.DATE,
        owner: DataTypes.INTEGER
    });
};