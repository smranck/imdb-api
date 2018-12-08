const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);

describe('Static Page', () => {
  describe('GET /', () => {
    it('should return a 200 status', (done) => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return html contest from index.html', (done) => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.be.html;
          done();
        });
    }).timeout(1000);
  });
});

after(() => process.exit(0));
