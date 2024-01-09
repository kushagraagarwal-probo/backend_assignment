const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index");

chai.use(chaiHttp);

chai.should();

describe("Get all contracts", () => {
  describe("/api/get", () => {
    it("should get all contracts", (done) => {
      chai
        .request(app)
        .get("/api/get")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should get a contract", (done) => {
        chai
          .request(app)
          .get("/api/get/6")
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
});