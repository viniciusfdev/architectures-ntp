import { JwtPayload } from 'jsonwebtoken';

export type TokenPayload = {
  sub: string;
  name: string;
  iat: number;
  code: string;
} & JwtPayload;

export type AuthSuccess = {
  authorized: true;
  sub: string | number;
  name: string;
  code: string;
};

export type AuthFail = { authorized: false; reason: string };

export type AuthResult = AuthSuccess | AuthFail;
