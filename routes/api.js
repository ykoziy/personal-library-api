/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;

const Book = require('../models/Book');
const mongoose = require('mongoose');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.find(req.query, (err, data) => {
        if (err) return res.status(500).json({error: `Something went wrong`});
        res.send(data);
      });
    })

    .post(function (req, res){
      let title = req.body.title;
      if (!title) {
        return res.status(422).send('missing title');
      }

      let newBook = new Book(req.body);
      newBook.save((err, data) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(data);
      });
    })

    .delete(function(req, res){
      Book.deleteMany({}, err => {
        if (err) return res.status(500).json({error: `Something went wrong`});
        res.send('complete delete successful');
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookID = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookID)) {
        return res.status(422).json({error: `_id error`});
      }

      Book.findById(bookID, (err, data) => {
        if (err) return res.status(500).json({error: `Something went wrong`});
        if (!data) return res.send('no book exists');
        res.json(data);
      });
    })

    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });

};
