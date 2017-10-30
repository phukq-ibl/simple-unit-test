const chai = require('chai');
const expect = require('chai').expect;
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


const app = require('../index.js');
const db = require('../db.js');
const sinon = require('sinon');

describe('API list', () => {
    it('Should return array', (done) => {
        var data = [{
            id: 2,
            name: 'Data from stub',
            finish: false
        }]
        
        var stub = sinon.stub(db, 'getAll').callsFake(function fakeFn(db, cb) {
            cb(null, data);
        });
        
        chai.request(app)
            .get('/list')
            .end((err, rs) => {
                rs.should.have.status(200);
                rs.body.should.be.a('array');
                rs.body.length.should.be.eql(1);
                expect(rs.body[0].name).to.equal(data[0].name)
                stub.restore();
                done()
            })
    })

    it('db.getAll should be called 1 times', (done) => {        
        sinon.spy(db, 'getAll');// (1)

        chai.request(app)
            .get('/list')
            .end((err, rs) => {
                expect(db.getAll.calledOnce).to.be.true;// (2)
                db.getAll.restore();// (3)
                done()
            })
    })
})