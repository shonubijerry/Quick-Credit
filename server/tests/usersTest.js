/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testDb from './testDb'
import errorStrings from '../helpers/errorStrings'

chai.use(chaiHttp);
chai.should();

const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';

describe('User Controller', () => {
  describe('POST /api/v1/auth/signup', () => {
    it(`it should register a user with POST ${signupUrl}`, (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.testUsers[0])
        .end((error, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have.property('email');
          done();
        });
    });

    it('it should not register a user with empty firstname or lastname', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb.testUsers[1])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.validName);
            done();
        });
    });

    it('it should not register a user with invalid firstname or lastname', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb.testUsers[1])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.validName);
            done();
        });
    });

    it('it should not register a user with invalid email', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb.testUsers[2])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.validEmail);
            done();
        });
    });

    it('it should not register a user with same email twice', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb.testUsers[3])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.emailExists);
            done();
        });
    });

    it('it should not register a user with invalid address', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb.testUsers[4])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.validAddress);
            done();
        });
    });

    it('it should not register a user with password less than 6 characters', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb.testUsers[5])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.passwordLength);
            done();
        });
    });

    it('it should not register a user with empty password field', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb.testUsers[6])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.passwordEmpty);
            done();
        });
    });
  });


  describe('POST /api/v1/auth/signin', () => {
    it(`it should login a user with valid email and password`, (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.testUsers[7])
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have.property('email');
          done();
        });
    });

    it('it should not login a user with invalid email', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.testUsers[8])
        .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.validEmail);
          done();
      });
    });

    it('it should not login a user with empty password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.testUsers[9])
        .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.passwordEmpty);
          done();
      });
    });

    it('it should not login a user who doesn\'t exist', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.testUsers[10])
        .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.emailNotExist);
          done();
      });
    });

    it('it should not login a user with wrong login email or password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.testUsers[11])
        .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.loginFailure);
          done();
      });
    });

  });



});