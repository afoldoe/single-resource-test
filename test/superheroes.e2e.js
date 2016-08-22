const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const assert = chai.assert;
chai.use(chaiHttp);
const app = require(`../lib/app`);

const mongoose = require(`mongoose`);
const connection = require(`../lib/mongoose-setup`);

describe(`e2e testing of the superhereo API`, () => {

  before(done => {
    mongoose.connect(`mongodb://localhost/user`, () => {
      connection.db.dropDatabase(() => {
        done();
      });
    });
  });

  const request = chai.request(app);
  let sample1 = {name: `Wonder Woman`, power: [`super strength`, `flight`]};
  let sample2 = {name: `Magneto`, power: [`metal manipulation`, `flight`]};

  it(`tests that we can post a new superhereo`, done => {
    request
      .post(`/`)
      .send(sample1)
      .then(res => {
        assert.equal(res.body.name, `Wonder Woman`);
        assert.isArray(res.body.power);
        assert.deepEqual(res.body.power, [`super strength`, `flight`]);
        done();
      })
      .catch(done);
  });

  it(`tests that we can get all the heroes in the database`, done => {
    request
      .post(`/`)
      .send(sample2)
      .then(res => {
        console.log(`Through second post!`);
      })
      .catch(done);

    request
      .get(`/`)
      .then(res => {
        console.log(res.body);
        assert.equal(res.body[1].name, `Magneto`);
        assert.isArray(res.body);
        done();
      })
      .catch(done);
  });


});
