import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {

  public async validateToken(token: string): Promise<string> {
    const bearerRegExp: RegExp = /Bearer ./;

    if (!bearerRegExp.test(token)) {
      throw new UnauthorizedException();
    }
    try {
      const parsedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token.split(' ')[1]);
      return parsedToken.sub;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
