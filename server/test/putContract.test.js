const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index");

chai.use(chaiHttp);

chai.should();

describe("Putting contract to db", () => {
  describe("/api/update/:contract_id", () => {
    it("should add a contract", (done) => {
        const contract = {
            "contract_name": "test",
            "amount": "00",
            "description": "test description"
        }
      chai
        .request(app)
        .put("/api/update/24")
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
        .put("/api/post/24")
        .send(contract)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});