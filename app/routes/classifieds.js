
'use strict';

const express = require('express');

const knex = require('../../knex');

// const {camelizeKeys, decamelizeKeys} = require('humps');

const router = express.Router();

router.get('/', (req,res,next)=>{
  knex('classifieds')
  .select('id', 'title', 'description','price', 'item_image', 'created_at')
  .then((response)=>{
    res.send(response);
  })
  .catch((err)=>{
    console.log(err);
  });
});

router.get('/:id', (req,res,next)=>{
  knex('classifieds')
  .where('id', req.params.id)
  .select('id', 'title', 'description','price', 'item_image', 'created_at')
  .then((response)=>{
    res.send(response[0])
  })
  .catch((err)=>{
    console.log(err);
  });
});

router.post('/', function (req,res) {
  knex('classifieds')
  .insert({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image
  }, ['id', 'title', 'description','price', 'item_image', 'created_at'])
  .then(function(response){
    res.send(response[0]);
  })
  .catch((err)=>{
    console.log(err);
  });
});

router.patch('/:id', (req,res)=>{
      knex('classifieds')
      .where('id', req.params.id)
      .update({
        'title': req.body.title,
        'description': req.body.description,
        'price': req.body.price,
        'item_image': req.body.item_image
      }, ['id', 'title', 'description','price', 'item_image', 'created_at'])
      .then((response) => {
        let theResponse = response[0];
        res.send(theResponse);
      })
      .catch((err)=>{
        console.log(err);
      });
});

router.delete('/:id', (req,res)=>{
  knex('classifieds')
  .where('id', req.params.id)
  .del()
  .returning(['id', 'title', 'description','price', 'item_image', 'created_at'])
  .then((response)=>{
    // var sendResponse = response[0];
    res.send(response[0])
  })
})

module.exports = router;
