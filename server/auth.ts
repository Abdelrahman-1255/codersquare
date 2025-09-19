import { JwtObject } from './types';
import jwt from 'jsonwebtoken';
export function singnJwt(obj: JwtObject): string {
  const secret = getJwtSecret();
  return jwt.sign(obj, secret, {
    expiresIn: '15d',
  });
}

export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Missing JWT secret');
    process.exit(1);
  }
  return secret;
}
