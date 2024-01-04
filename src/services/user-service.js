const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userReository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userReository.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong at service layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something went wrong in token validation");
      throw error;
    }
  }

  checkPassword(plainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong in password comparision");
      throw error;
    }
  }
}

module.exports = UserService;
