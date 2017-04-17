const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const assert = chai.assert
const should = chai.should()
const app = require('../server.js')

chai.use(chaiHttp)

describe('Server', function() {
  it('should exist', function() {
    expect(app).to.exist;
  });
});

describe('GET /items', function() {
  it('should return all items', function(done){
  chai.request(app)
    .get('/items')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.equal(2);
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('id');
      res.body[0].should.have.property('reason');
      res.body[0].should.have.property('cleanliness');
      done()
    })
  })
})

describe('GET /items/:id', function() {
    it('should return a specific item', function(done){
    chai.request(app)
      .get(`/items/1`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.name.should.equal('Hubcap')
        res.body.id.should.equal('1')
        res.body.cleanliness.should.deep.equal({Sparkling: true, Dusty: false, Rancid: false})
        res.body.reason.should.equal('Future mixed media project')
        done()
      })
    })

    it('should return not found for an item that doesn\'t exist', function(done){
    chai.request(app)
      .get(`/items/9`)
      .end(function (err, res) {
        res.should.have.status(404);
        done()
      })
    })
  })

  describe('POST /items', function() {
      it('should return the array of items with the added item', function(done){
      chai.request(app)
        .post(`/items`)
        .send({ name: 'glasses', reason: 'hoarding', id: 3, cleanliness: {Sparkling: false, Dusty: true, Rancid: false}
        })
        .end(function (err, res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          res.body[2].should.have.property('name', 'glasses');
          res.body[2].should.have.property('reason', 'hoarding');
          res.body[2].should.have.property('id');
          res.body[2].cleanliness.should.deep.equal({Sparkling: false, Dusty: true, Rancid: false});
          done()
        })
      })

      it('should return a 422 error if the request body isn\'t properly formatted', function(done){
      chai.request(app)
        .post(`/items`)
        .send({ name: 'glasses', cleanliness: {Sparkling: false, Dusty: true, Rancid: false}
        })
        .end(function (err, res) {
          res.should.have.status(422);
          res.should.be.json;
          res.body.error.should.equal('All item properties are not provided')
          done()
        })
      })
    })

describe('PUT /items/:id', function() {
    it('should return the updated item', function(done){
    chai.request(app)
      .put(`/items/1`)
      .send({ cleanliness: {Sparkling: false, Dusty: false, Rancid: true}
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3)
        res.body[0].should.have.property('name', 'Hubcap');
        res.body[0].should.have.property('reason', 'Future mixed media project');
        res.body[0].should.have.property('id');
        res.body[0].cleanliness.should.deep.equal({Sparkling: false, Dusty: false, Rancid: true});
        done()
      })
    })

    it('should return a 404 error if the item doesn\'t exist', function(done){
    chai.request(app)
      .put(`/items/4`)
      .send({ name: 'glasses', cleanliness: {Sparkling: false, Dusty: true, Rancid: false}
      })
      .end(function (err, res) {
        res.should.have.status(404);
        res.body.error.should.equal('Not found')
        done()
      })
    })

    it('should return a 422 error if the request isn\'t properly formatted', function(done){
    chai.request(app)
      .put(`/items/1`)
      .send({fake:'property'})
      .end(function (err, res) {
        res.should.have.status(422);
        res.body.error.should.equal('No properties provided')
        done()
      })
    })
  })
