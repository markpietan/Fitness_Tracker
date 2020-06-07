function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function generateUpdateString(fields) {
  const keysArray = Object.keys(fields);
  const psqlArray = keysArray.map(function (e, index) {
    return `"${e}"=$${index + 1}`;
  });
  const psqlString = psqlArray.join(", ");

  return psqlString;
}

module.exports = {
  requireUser,
  generateUpdateString,
};
