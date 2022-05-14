import { MiddlewareObj } from '@middy/core';
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { IdentityContext } from '../context/identity.context';
import { RequestContext } from '../context/request.context';
import { AppError } from '../utils/errors.utils';

export type AppRequest<Body = any> = APIGatewayProxyEventV2 & {
  appBody: Body;
  appRequestContext: RequestContext;
  appIdentityContext: IdentityContext;
};

export type AppMiddleware<Body = any, Response = any> = MiddlewareObj<
  AppRequest<Body>,
  APIGatewayProxyResultV2<Response>,
  AppError
>;

export type AppHandler<Response = any> = APIGatewayProxyHandlerV2<Response>;
