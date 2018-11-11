var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next){
    if(req.method == 'OPTIONS'){
        next();
        } else {
        var sessionToken = req.headers.authorization;
        console.log(sessionToken);
            if (!sessionToken) return res.status(403).send({ authorized: false, message: 'No token provided.' });
            else {
                jwt.verify(sessionToken, process.env.SIGN, (err, decoded) => {
                    if(decoded){
                        User.findOne({
                            where: { id : decoded.id }
                        }).then(user => {
                            req.user = user;
                            next();
                            },
                            function(){
                                res.status(401).send({error: 'Not authorized'});
                            });
                        } else {
                            res.status(400).send(
                                {error: 'Not authorized'}
                            );
                        }
                });
            }
        }
}   

 // var owner = req.body.admin.store_owner;
            // var ownerName = req.body.admin.owner_id;
            // console.log(`(${ownerName}) is a store owner?: ${owner}`);
             // if(owner === true){
            //     jwt.verify(ownerName, process.env.SIGN, (err, decoded) => {
            //         if(decoded){
            //             Admin.findOne({where: {owner_id: decoded.owner_id}}).then(admin => {
            //                req.admin = admin;
            //                 }).then(jwt.verify(sessionToken, process.env.SIGN, (err, decoded) => {
            //                     if(decoded){
            //                         Admin.findOne({where: { id: decoded.id}})
            //                         .then(admin => {
            //                             req.admin = admin;
            //                             next();
            //                         }, 
            //                         function(){ res.status(401).send({error: 'Not authorized'}) },
            //                     } else {
            //                          res.status(400).send({error: 'Not authorized'}) 
            //                 }
            //             }))}
            //             })
            //         } else {res.status(400).send({error: 'Not authorized'});
            //         })}
           