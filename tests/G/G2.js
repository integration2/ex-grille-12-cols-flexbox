const { allHaveClass } = require('../helpers');

async function runTest(page) {
  return allHaveClass(page, '.nouvelles .nouvelle', 'cols_4_de_12', 3);
}

module.exports = { runTest };
