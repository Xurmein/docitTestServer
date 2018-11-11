module.exports = function(sequelize, DataType){
    return sequelize.define('category', {
        creator:{
            type: DataType.STRING,
            allowNull: false,
        },
        docIt_id:{
            type: DataType.STRING,
            allowNull: false
        },
        title:{
            type: DataType.STRING,
            allowNull: false,
        }
    });
};