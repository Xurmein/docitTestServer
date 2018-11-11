module.exports = function(sequelize, DataType){
    return sequelize.define('user', {
        username:{
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        passwordhash:{
            type: DataType.STRING,
            allowNull: false
        },
        confirmed_email:{
           type: DataType.BOOLEAN,
           //allowNull: true change to false after initial testing
        },
        // timezone:{
        //     type: DataType.ENUM,
        //      allowNull: true
        // }
    });
};