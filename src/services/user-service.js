const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");
const { response } = require("express");

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

  async signIn(email, plainPassword) {
    try {
      const user = await this.userReository.getByEmail(email);
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("password does'nt match");
        throw { error: "Incorrect Password" };
      }

      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("something went wrong in sign in process");
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

  async isAuthenticated(token) {
    try {
      const isTokenVerified = await this.verifyToken(token);
      if (!isTokenVerified) {
        throw { error: "Invalid token" };
      }
      const user = await this.userReository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exist" };
        return user;
      }
    } catch (error) {
      console.log("something went wrong in the auth process");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      return this.userReository.isAdmin(userId);
    } catch (error) {
      console.log("something went wrong to find role of user");
      throw error;
    }
  }
}

module.exports = UserService;
