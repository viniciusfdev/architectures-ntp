import jwt from 'jsonwebtoken';
import { singleton } from 'tsyringe';
import { AuthResult, TokenPayload } from '../types/auth.types';
import { AppError } from '../utils/errors.utils';

@singleton()
export default class AuthModel {
  private static readonly secret: string = 'Secret';

  async authenticate(username: string, password: string): Promise<AuthResult> {
    if (username === 'username' && password === 'password') {
      return { authorized: true, sub: 1, name: 'user', code: 'cfg1' };
    } else if (username === 'username2' && password === 'password2') {
      return { authorized: true, sub: 20, name: 'user', code: 'cfg2' };
    } else {
      return { authorized: false, reason: 'username or password is not correctly' };
    }
  }

  async issueSession(sub: string | number, name: string, code: string): Promise<string> {
    return jwt.sign({ sub, name, code }, AuthModel.secret, {
      expiresIn: '1d',
    });
  }

  async verifySession(token: string): Promise<TokenPayload> {
    try {
      return jwt.verify(token, AuthModel.secret) as TokenPayload;
    } catch (error: any) {
      throw new AppError(401, error);
    }
  }
}
