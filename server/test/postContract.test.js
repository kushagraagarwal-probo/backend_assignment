const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index");

chai.use(chaiHttp);

chai.should();

describe("Adding contract to db", () => {
  describe("/api/post", () => {
    it("should add a contract", (done) => {
        const contract = {
            "contract_name": "test",
            "amount": "00",
            "description": "test description"
        }
      chai
        .request(app)
        .post("/api/post")
        .send(contract)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("should return error", (done) => {
        const contract = {
            "contract_name": "test",
            "amount": "",
            "description": "test description"
        }
      chai
        .request(app)
        .post("/api/post")
        .send(contract)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});