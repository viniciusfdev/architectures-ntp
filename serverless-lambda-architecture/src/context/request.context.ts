import { PublicRoutes } from '../assets/routes';
import { AppRequest } from '../types/api.types';

export class RequestContext<RequestBody = any> {
  event: AppRequest<RequestBody>;
  accessToken: string;
  public: boolean;
  path: string;

  constructor(event: RequestContext['event']) {
    this.event = event;
    this.accessToken = (event.headers.Authorization || '').replace('Bearer ', '');
    this.public = PublicRoutes.includes(event.rawPath);
    this.path = event.rawPath;
  }
}
