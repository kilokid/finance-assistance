import { UserService } from '../service/user.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {

    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {

    } catch (err) {
      next(err);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {

    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {

    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
