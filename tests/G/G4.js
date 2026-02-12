const { hasClass } = require('../helpers');

async function runTest(page) {
  const services = await page.$$('.services .service');
  if (services.length < 2) {
    return {
      pass: false,
      message: `Deux .service attendus dans .services (trouvé: ${services.length})`
    };
  }
  const firstHas = await services[0].evaluate((e) => e.classList.contains('cols_4_de_12'));
  const secondHas = await services[1].evaluate((e) => e.classList.contains('cols_8_de_12'));
  const pass = firstHas && secondHas;
  return {
    pass,
    message: pass
      ? 'Le premier .service a cols_4_de_12 et le second cols_8_de_12'
      : `Services: premier doit avoir cols_4_de_12 (${firstHas}), second cols_8_de_12 (${secondHas})`
  };
}

module.exports = { runTest };
