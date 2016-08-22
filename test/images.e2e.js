const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const assert = chai.assert;
chai.use(chaiHttp);
const app = require(`../lib/app`);

const mongoose = require(`mongoose`);
const connection = require(`../lib/mongoose-setup`);

describe(`e2e testing of the images API`, () => {

  before(done => {
    mongoose.connect(`mongodb://localhost/user`, () => {
      connection.db.dropDatabase(() => {
        done();
      });
    });
  });

  const request = chai.request(app);
  let sample1 = {title: `Wonder Woman`, url: `http://google.com/wonder-woman`, caption: `Wonder Woman defeats Maxwell Lord`};
  let sample2 = {title: `Magneto`, url: `http://google.com/magneto`, caption: `Magneto leaves Xavier forever`};

  it(`tests that we can post a new superhereo`, done => {
    request
      .post(`/`)
      .send(sample1)
      .then(res => {
        assert.equal(res.body.title, `Wonder Woman`);
        assert.deepEqual(res.body.url, `http://google.com/wonder-woman`);
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
        assert.equal(res.body.length, 2);
        assert.equal(res.body[1].title, `Magneto`);
        assert.isArray(res.body);
        done();
      })
      .catch(done);
  });


});
