const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index");

chai.use(chaiHttp);

chai.should();

describe("Deleting contract to db", () => {
  describe("/api/remove/:contract_id", () => {
    it("should delete a contract", (done) => {
      chai
        .request(app)
        .delete("/api/remove/5")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});