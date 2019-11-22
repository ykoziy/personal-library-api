/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

let bookID;

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  *
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
        chai.request(server)
         .post('/api/books')
         .send({title: 'The Alchemist'})
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.title, 'The Alchemist');
           bookID = res.body._id;
           done();
         });
      });

      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
         .post('/api/books')
         .end(function(err, res){
           assert.equal(res.status, 422);
           assert.equal(res.text, 'missing title');
           done();
         });
      });

    });


    suite('GET /api/books => array of books', function(){

      test('Test GET /api/books',  function(done){
        chai.request(server)
         .get('/api/books')
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.isArray(res.body, 'response should be an array');
           assert.property(res.body[0], '_id', 'Books in array should contain _id');
           assert.property(res.body[0], 'title', 'Books in array should contain title');
           assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
           done();
         });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function(){

      test('Test GET /api/books/[id] with id not in db',  function(done){
         chai.request(server)
          .get('/api/books/111111111111111111111111')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });
      //to retrieve a single
      //object of a book containing title, _id, & an array of comments
      //(empty array if no comments present).
      test('Test GET /api/books/[id] with valid id in db',  function(done){
         chai.request(server)
          .get('/api/books/'+bookID)
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body._id, bookID);
            assert.equal(res.body.title, 'The Alchemist');
            assert.isArray(res.body.comments, 'response should have an array of comments');
            done();
          });
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){

      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
         .post('/api/books/'+bookID)
         .send({comment: "It's the possibility of having a dream come true that makes life interesting."})
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body._id, bookID);
           assert.isArray(res.body.comments, 'response should have an array of comments');
           assert.equal(res.body.commentcount, 1);
           assert.equal(res.body.comments[0], "It's the possibility of having a dream come true that makes life interesting.");
           done();
         });
      });

    });

  });

});
