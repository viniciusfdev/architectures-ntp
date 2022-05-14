import { throwMissingRequiredAttributes } from '../utils/errors.utils';
import { RequestContext } from './request.context';
import { Index, User } from '../types/data.types';
import AuthModel from '../models/auth.model';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class IdentityContext {
  code!: string;
  sub!: Index;
  name!: string;
  iat!: number;
  user!: User;

  constructor(private reqC: RequestContext, private authM?: AuthModel) {}

  async initialize() {
    if (this.reqC.public !== true) {
      const payload = await this.authM.verifySession(this.reqC.accessToken);
      throwMissingRequiredAttributes(payload, ['sub', 'code']);
      this.sub = payload.sub;
      this.name = payload.name;
      this.iat = payload.iat;
      this.code = payload.code;
    }
  }
}
