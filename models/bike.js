module.exports = (sequelize, DataTypes) => {
    return sequelize.define('bike', {
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        year: DataTypes.STRING,
        frame: DataTypes.STRING,
        suspension: DataTypes.ENUM('', 'Full suspension', 'Hardtail', 'None'),
        fork: DataTypes.STRING,
        shock: DataTypes.STRING,
        wheelSize: DataTypes.ENUM('', '24', '26', '27.5', '29'),
        shifters: DataTypes.STRING,
        derailleur: DataTypes.STRING,
        cassette: DataTypes.STRING,
        brakes: DataTypes.STRING,
        tires: DataTypes.STRING,
        additionalComponents: DataTypes.TEXT,
        plannedUpgrades: DataTypes.TEXT,
        owner: DataTypes.INTEGER
    });
}