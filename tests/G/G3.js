const { allHaveClass } = require('../helpers');

async function runTest(page) {
  return allHaveClass(page, '.centre.rangee > div', 'cols_6_de_12', 2);
}

module.exports = { runTest };
