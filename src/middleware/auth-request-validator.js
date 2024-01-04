const validateUserAuth = (req, res, next) => {
  if (!(req.body.email || req.body.password)) {
    return res.status(400).json({
      data: [],
      message: "Email or password missing",
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
};
