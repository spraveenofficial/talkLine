import User from "../models/User.js";
class UserService {
  async findUser(filter) {
    const user = await User.findOne(filter);
    return user;
  }

  async createUser(data) {
    const user = await User.create(data);
    return user;
  }
}

export default new UserService();
