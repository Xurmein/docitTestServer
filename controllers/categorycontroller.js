var router = require('express').Router();
var sequelize = require('../db');
var Category = sequelize.import('../models/category');

router.post('/defineCategories', function(req, res){
    let userid = req.body.category.creator;

    let Title = req.body.category.title;
    let Creator = req.body.category.creator;
    let docit = req.body.category.docIt_id;


    Category.create({
        title : Title,
        creator: Creator,
        docIt_id : docit
    }, {where: {docIt_id : docit, creator : userid}}
    ).then(
        function createCat(category){
            res.json({
                message : 'New category for activities created!',
                Title : req.body.category.title,
                docit : req.body.category.docIt_id
            });
        },
        function createCatFail(err){
            res.status(500).send(err)
        }
    );
});

router.get('/myCategories', function(req, res){
    let userid = req.body.category.creator;

    Category.findAll({
        where: {creator : userid}
    }).then(
        function getMyDocItCats(data){
            res.json(data)
        },
        function getCatsFail(err){
            res.status(500).send({error : '500 - Internal Server Error'})
        }
    );
});

router.get('/myCategories/:id', function(req, res){
    let data = req.params.id;
    let userid = req.body.category.creator;

    Category.findOne({
        where: { id : data, creator : userid } 
    }).then(
        function foundOneCat(data){
            res.json(data);
        },
        function findNoCat(err){
            res.status(500).send({error: '500 - Internal Server Error'})
        }
    )
})

router.delete('/deleteCategory/:id', function(req, res){
    let data = req.params.id;
    let userid = req.body.category.creator;

    Category.destroy({
        where: {id : data, creator : userid}
    }).then(
        function euthenizeCat(data){
            res.json({
                message: 'Deleted!'
            });
        },
        function stillLivingCat(err){
            res.status(500).send({error: '500 - Internal Server Error'});
        }
    );
});

router.put('/alterCategory/:id', function(req, res){
    let data = req.params.id;
    let Title = req.body.category.title;
    let Creator = req.body.category.creator;
    let docit = req.body.category.docIt_id;

    Category.update({
        title : Title,
        creator : Creator,
        docIt_id : docit
    }, {where: {id : data}}
    ).then(
        function catUpdate(updatedCategory){
            res.json({
                message : 'Category updated!'
            });
        },
        function catUpdateFail(err){
            res.status(500).send({error : '500 - Internal Server Error'})
        }
    );
});

module.exports = router;