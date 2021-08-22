import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { userModel } from '../models/user.js';
import { EmailService } from './email.js';
import { TokenService } from './token.js';
import { UserDTO } from '../dto/user.js';
import { ApiError } from '../exceptions/api-error.js';

export class UserService {
  static async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с email ${email} уже существует!`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidV4();
    const user = await userModel.create({ email, password: hashPassword, activationLink });
    await EmailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }

  static async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }

    user.isActivated = true;
    await user.save();
  }

  static async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с email ${email} не был найден!`);
    }

    const isPasswordsEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordsEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const userDto = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }

  static async logout(refreshToken) {
    await TokenService.removeToken(refreshToken);
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDatabase = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDatabase) {
      throw ApiError.UnauthorizedError();
    }

    const user = await userModel.findById(userData.id);
    const userDto = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }
}
