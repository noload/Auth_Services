const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: response,
      message: "User created successfully",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "User not created, something went wrong",
      success: false,
      err: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      data: response,
      success: true,
      message: "Token created sussfully",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "user is authenticated and  token is valid",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully fetched user is admin or not",
      err: {},
    });
  } catch (error) {
    console.log("something went wrong at controller level");
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error.message,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
