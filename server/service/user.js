import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { userModel } from '../models/user.js';
import { EmailService } from './email.js';
import { TokenService } from './token.js';
import { UserDTO } from '../dto/user.js';

export class UserService {
  static async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с email ${email} уже существует!`);
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
}
