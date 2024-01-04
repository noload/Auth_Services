const UserRepository = require("../repository/user-repository");

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
}

module.exports = UserService;
