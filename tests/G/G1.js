const { hasClass } = require('../helpers');

async function runTest(page) {
  return hasClass(page, '.accroche', 'cols_8_de_12');
}

module.exports = { runTest };
