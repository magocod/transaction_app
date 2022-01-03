exports.mochaGlobalSetup = async function () {
  console.log(`before all tests`);
};

exports.mochaGlobalTeardown = async function() {
  console.log('after all tests');
};
