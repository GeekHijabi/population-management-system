import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import server from '../server';

chai.should();
chai.use(chaiHttp);

describe('Populaton Management System', () => {
  let locId;
  let subLocationId;
  before((done) => {
    mongoose.createConnection(process.env.DATABASE_URL, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      })
    });
  });
  it('should display the welcome page', (done) => {
    chai.request(server).get('/api/v1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  describe('when creating a new location', () => {
    it('should check if there is a location name', (done) => {
      chai.request(server).post('/api/v1/location').send({
        name: ''
      })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.errors.name.should.equal('Name field cannot be empty');
          done();
        });
    });

    it('should create a new main location', (done) => {
      chai.request(server).post('/api/v1/location').send({
        name: 'Nigeria',
        isMainLocation: true
      })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('Location created successfully');
          locId = res.body.locationDetails._id;
          done();
        });
    });

    it('should create a new sublocation', (done) => {
      chai.request(server).post('/api/v1/location').send({
        name: 'Lagos',
        female_population: 10,
        male_population: 12,
        locId
      })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('New sublocation created successfully');
          res.body.total_population.should.equal(22);
          subLocationId = res.body.id;
          done();
        });
    });

    it('should return error if there is no parent location', (done) => {
      chai.request(server).post('/api/v1/location').send({
        name: 'Lagos',
        female_population: 10,
        male_population: 12,
        locId: '5c731d3218e36f9a5ea60e00'
      })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('No main Location found');
          done();
        });
    });

    it('should return error message if male population input is not a number', (done) => {
      chai.request(server).post('/api/v1/location').send({
        name: 'Lagos',
        female_population: 10,
        male_population: 'a',
        locId
      })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.errors.male_population.should.equal('Male population should be a number');
          done();
        });
    });

    it('should return error message if female population input is not a number', (done) => {
      chai.request(server).post('/api/v1/location').send({
        name: 'Lagos',
        female_population: 'as',
        male_population: 10,
        locId
      })
        .end((error, res) => {
          res.should.have.status(400);
          res.body.errors.female_population.should.equal('Female population should be a number');
          done();
        });
    });
  });

  describe('get all locations', () => {
    chai.request(server).get('/api/v1/locations')
      .end((error, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('All locations fetched');
        res.body.should.have.property('locations');
      });
  });

  describe('update location', () => {
    it('should return a 404 if the location is not found', () => {
      const fakelocId = '5c73417553d385c666f6bffe'
      chai.request(server).patch(`/api/v1/location/${fakelocId}`)
        .send({
          name: 'Rebecca'
        })
        .end((error, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('Location not found');
        })
    })
    it('should update location if location id is correct', () => {
      chai.request(server).patch(`/api/v1/location/${locId}`)
        .send({
          name: 'Rebecca'
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Sublocation details updated successfully');
        })
    })
  });

  // describe('delete main location', () => {
  //   it('should return a 404 if location not found', () => {
  //     let fakelocId = "5rjtne22333333";
  //     chai.request(server).delete(`api/v1/mainlocation/${fakelocId}`)
  //       .end((error, res) => {
  //         res.body.message.should.equal('Location does not exist')
  //       });
  //   });

  //   it('should delete successfully', () => {
  //     chai.request(server).delete(`api/v1/mainlocation/${locId}`)
  //       .end((error, res) => {
  //         res.should.have.status(200);
  //         res.body.message.should.equal('Location successfully deleted')
  //       });
  //   });
  // });

  describe('delete sub location', () => {
    it('should return an error message if the sub location to delete is unavailable', () => {
      let fakelocId = "5c73417553d385c666f6bffe";
      chai.request(server).delete(`/api/v1/location/${fakelocId}`)
        .end((error, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('Location does not exist');
        });
    });
    it('should delete successfully', () => {
      chai.request(server).delete(`/api/v1/location/${subLocationId}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Location successfully deleted');
        });
    });
  });
});
