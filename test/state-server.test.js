var request = require('supertest');
var assert = require('chai').assert;
var app = require('../app');

describe('State Server Tests', function () {
    //Test Washington, Kansas,  Florida

    describe('#POST /checkingAccount', function () {
        it('should fail because params are not given', function (done) {
            request(app)
                .post('/')
                .expect(400)
                .end(function (err, res) {
                    assert.deepEqual(res.error.text, "latitude & longitude must be defined as numbers");
                    done();
                });
        });

        it('should fail because longitude is not a number', function (done) {
            request(app)
                .post('/')
                .send("longitude=-foo&latitude=46.5")
                .expect(400)
                .end(function (err, res) {
                    assert.deepEqual(res.error.text, "latitude & longitude must be defined as numbers");
                    done();
                });
        });

        it('should fail because latitude is not a number', function (done) {
            request(app)
                .post('/')
                .send("longitude=-100&latitude=bar")
                .expect(400)
                .end(function (err, res) {
                    assert.deepEqual(res.error.text, "latitude & longitude must be defined as numbers");
                    done();
                });
        });

        it('should return Washington', function (done) {
            request(app)
                .post('/')
                .send("longitude=-118.4&latitude=46.5")
                .expect(200)
                .end(function (err, res) {
                    assert.deepEqual(res.body, ['Washington']);
                    done();
                });
        });

        it('should return Kansas', function (done) {
            request(app)
                .post('/')
                .send("longitude=-98.6&latitude=38.1")
                .expect(200)
                .end(function (err, res) {
                    assert.deepEqual(res.body, ['Kansas']);
                    done();
                });
        });

        it('should return Pennsylvania', function (done) {
            request(app)
                .post('/')
                .send("longitude=-77.036133&latitude=40.513799")
                .expect(200)
                .end(function (err, res) {
                    assert.deepEqual(res.body, ['Pennsylvania']);
                    done();
                });
        });

        it('should return Florida', function (done) {
            request(app)
                .post('/')
                .send("longitude=-85.1&latitude=29.1")
                .expect(200)
                .end(function (err, res) {
                    assert.deepEqual(res.body, ['Florida']);
                    done();
                });
        });
    });

});