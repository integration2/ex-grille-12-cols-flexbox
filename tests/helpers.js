/**
 * Shared test helpers for Katas Grille Flexbox autograding
 */

async function hasClass(page, selector, className) {
  const el = await page.$(selector);
  if (!el) {
    return { pass: false, message: `Élément non trouvé: ${selector}` };
  }
  const classList = await el.evaluate((e) => Array.from(e.classList));
  const hasIt = classList.includes(className);
  return {
    pass: hasIt,
    message: hasIt
      ? `L'élément ${selector} a bien la classe ${className}`
      : `L'élément ${selector} doit avoir la classe ${className} (classes actuelles: ${classList.join(' ') || '(aucune)'})`
  };
}

async function allHaveClass(page, selector, className, expectedCount) {
  const elements = await page.$$(selector);
  if (elements.length < expectedCount) {
    return {
      pass: false,
      message: `Seulement ${elements.length} élément(s) trouvé(s) pour ${selector} (attendu: ${expectedCount})`
    };
  }
  const results = await Promise.all(
    elements.slice(0, expectedCount).map((el) =>
      el.evaluate((e, cls) => e.classList.contains(cls), className)
    )
  );
  const allOk = results.every(Boolean);
  const which = results
    .map((ok, i) => (ok ? '' : i + 1))
    .filter(Boolean)
    .join(', ');
  return {
    pass: allOk,
    message: allOk
      ? `Les ${expectedCount} éléments ${selector} ont bien la classe ${className}`
      : `Les éléments ${selector} doivent tous avoir la classe ${className} (manquant sur: ${which})`
  };
}

module.exports = { hasClass, allHaveClass };
