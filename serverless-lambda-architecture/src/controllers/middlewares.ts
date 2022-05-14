import { IdentityContext } from '../context/identity.context';
import { RequestContext } from '../context/request.context';
import { AppMiddleware } from '../types/api.types';
import { Response } from '../utils/api.utils';

export const initializeContext: AppMiddleware = {
  before: async (handler) => {
    const reqC = new RequestContext(handler.event);
    const idC = new IdentityContext(reqC);
    await idC.initialize();
    handler.event.appRequestContext = reqC;
    handler.event.appIdentityContext = idC;
  },
};

export const parseRequest: AppMiddleware = {
  before: async (handler) => {
    handler.event.appBody = JSON.parse(handler.event.body || (null as any));
  },
};

export const errorHandler: AppMiddleware = {
  onError: async (handler) => {
    if (handler.error) {
      const { statusCode = 500, message, name } = handler.error;
      handler.response = Response({ data: { message, name }, statusCode });
    }
  },
};
