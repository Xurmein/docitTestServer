module.exports = function(sequelize, DataType){
    return sequelize.define('docit', {
        owner:{
            type: DataType.STRING,
            allowNull: false,
        },
        docName:{
           type: DataType.TEXT,
           allowNull: true,
        },
        day:{
            type: DataType.ENUM,
            values: [
                'Monday', 
                'Tuesday', 
                'Wednesday', 
                'Thursday', 
                'Friday', 
                'Saturday', 
                'Sunday'
            ],
            allowNull: false
        },
        time:{
            type: DataType.STRING,
            allowNull: false
        },
        description:{
            type: DataType.TEXT,
            allowNull: true
        },
        user_category:{ 
            type:DataType.STRING,
            allowNull: true,
        }
    });
};