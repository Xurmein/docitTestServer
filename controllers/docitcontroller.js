var router = require('express').Router();
var sequelize = require('../db');
var docIt = sequelize.import('../models/docit');

router.post('/docitCreate', function (req, res){
    let ownerID = req.body.docit.owner;
    let docitname = req.body.docit.docName;
    let dayOfWeek = req.body.docit.day;
    let timeOfDay = req.body.docit.time;
    let docitInfo = req.body.docit.description;
    let userCat = req.body.docit.user_category;

    docIt.create({
        owner: ownerID,
        docName: docitname,
        day: dayOfWeek,
        time: timeOfDay,
        description: docitInfo,
        user_category: userCat
    }).then(
       
        function createDocIt(){
           
            res.json({
                message: 'Congrats. You planned the following activity:',
                docitname: req.body.docit.docName,
                day: req.body.docit.day,
                time: req.body.docit.time,
                description: req.body.docit.description,
                user_category: req.body.docit.user_category
                
            }); 
            
        },
        function activityError(err){
            res.status(500).send(err);
        }
    );
});

router.get('/mydocits', function(req, res){
    let userid = req.body.docit.owner;

    docIt.findAll({
        where: { owner : userid }
    })
    .then(
        function gotMyDocIts(data){
            res.json(data)
        },
        function getFail(err){
            res.status(500).send({error: '500 - Internal Service Error'});
        }
    );
});

router.get('/mydocits/:id', function(req, res){
    let data = req.params.id;
    let userid = req.body.docit.owner;

    docIt.findOne({
        where: { id : data, owner : userid}
    }).then(
        function findOneDocit(data){
            res.json(data);
        },
        function noFindDocket(err){
            res.status(500).send({error: '500 - Internal Service Error'})
        }
    )
})

router.delete('/docitDelete/:id', function(req, res){
    let data = req.params.id;
    let userid = req.body.docit.owner;

    docIt.destroy({
        where: { id: data, owner: userid }
    }).then(
        function deleteSctivitySuccess(data){
            res.send(`${req.body.docit.docName} has been removed from your docket`);
        },
        function deleteActivityError(err){
            res.status(500).send({error: '500 - Internal Server Error'});
        }
    );
});

router.put('/docitUpdate/:id', function(req, res){
    let data = req.params.id;
    let ownerID = req.body.docit.owner;
    let docitname = req.body.docit.docName;
    let dayOfWeek = req.body.docit.day;
    let timeOfDay = req.body.docit.time;
    let docitInfo = req.body.docit.description;
    let userCat = req.body.docit.user_category;

    docIt.update({
        owner: ownerID,
        docName: docitname,
        day: dayOfWeek,
        time: timeOfDay,
        description:docitInfo,
        user_category: userCat
    }, { where: { id: data } }
    ).then(
        function docitUpdateSuccess(updatedDocIt){
            res.json({
                message: 'docIt updated, check your docket to confirm accuracy'
            });
        },
        function updateError(err){
            res.status(500).send({error: '500 - Internal Server Error'});
        }
    );
});


module.exports = router;