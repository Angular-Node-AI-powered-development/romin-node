/**
 * Health module validation. GET health has no body/params to validate; export pattern for other modules.
 */
function validateGetHealth(req, res, next) {
  return next();
}

module.exports = { validateGetHealth };
