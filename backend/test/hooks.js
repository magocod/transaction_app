exports.mochaHooks = {
  // beforeEach(done) {
  //   // do something before every test
  //   console.log("call hook");
  //   done();
  // },
  async beforeEach() {
    // do something before every test
    console.log("call hook");
  },
};
