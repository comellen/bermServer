module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trail', {
        name: DataTypes.STRING,
        location: DataTypes.STRING,
        length: DataTypes.DECIMAL,
        difficulty: DataTypes.ENUM('Easy', 'Intermediate', 'Advanced', 'Most Advanced'),
        notes: DataTypes.TEXT,
        completed: DataTypes.ENUM('Yes', 'No'),
        date: DataTypes.DATE,
        owner: DataTypes.INTEGER
    });
};