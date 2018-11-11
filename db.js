const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME, process.env.DATA, process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function(){
        console.log('doc[It] test server on localhost is go')
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;